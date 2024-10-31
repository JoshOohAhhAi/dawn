if (!customElements.get('x-variant-picker')) {
	class VariantPicker extends HTMLElement {
		constructor() {
			super();
			this.selectors = {
				productSku: '[data-product-sku]',
				productAvailability: '[data-product-availability]',
        selectedValues: ['.x-variant-picker__selected-value']
			}

      this.section = document.querySelector(`.${this.sectionId}`) || this.closest('.x-section')
			this.Utils = window.Foxify.Utils
			this.Extensions = window.Foxify.Extensions
			this.optionsSwatches = window.Foxify.Extensions ? window.Foxify.Extensions.optionsSwatches : {}
			this.productId = this.dataset.productId
			this.sectionId = this.dataset.sectionId
			this.productForm = this.section && this.section.querySelectorAll('.x-product-form')
      this.buyButtons = this.section && this.section.querySelectorAll('x-buy-button')
			this.domNodes = this.Utils.queryDomNodes(this.selectors, this.section)
			this.addEventListener('change', this.onVariantChange);

			if (this.optionsSwatches && this.optionsSwatches.enabled) {
				this.initOptionSwatches()
			}
		}

		onVariantChange() {
			this.updateOptions();
			this.updateMasterId();
			this.updateSelectedValue();
			this.toggleAddButton(true, '', false);
			this.updatePickupAvailability();
			this.removeErrorMessage();

			if (!this.currentVariant) {
				this.toggleAddButton(true, '', true);
				this.setUnavailable();
			} else {
				this.updateMedia();
				this.updateURL();
				this.updateVariantInput();
				this.renderProductInfo();
				this.updateProductMeta();
			}
			window.Foxify.Events.emit(`${this.productId}__VARIANT_CHANGE`, this.currentVariant, this)
		}

		updateOptions() {
			const fields = Array.from(this.querySelectorAll('.x-variant-picker__input'));
			this.options = fields.map((field) => {
				const fieldType = field.dataset.fieldType
				if (fieldType === 'button') return Array.from(field.querySelectorAll('input')).find((radio) => radio.checked).value
				return field.querySelector('select') ? field.querySelector('select').value : '';
			});
		}

		updateMasterId() {
			this.currentVariant = this.getVariantData().find((variant) => {
				return !variant.options.map((option, index) => {
					return this.options[index] === option;
				}).includes(false);
			});
		}

    updateSelectedValue() {
      if (this.options && this.domNodes.selectedValues.length) {
        this.domNodes.selectedValues.map(((op, index) => {
          op.textContent = this.options[index]
        }))
      }
		}

		updateMedia() {
			if (!this.currentVariant) return;
			if (!this.currentVariant.featured_media) return;

			const mediaGallery = this.section.querySelector('x-media-gallery')

			if (mediaGallery) mediaGallery.setActiveMedia(this.currentVariant.featured_media.id)
		}

		updateURL() {
			if (!this.currentVariant || Foxify.Settings.template !== 'product') return;
			window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
		}

		updateVariantInput() {
			const productForms = document.querySelectorAll(`#product-form-${this.sectionId}, #product-form-${this.sectionId}-dynamic, #product-form-installment-${this.sectionId}`);
			productForms.forEach((productForm) => {
				const input = productForm.querySelector('[name="id"]');
				input.value = this.currentVariant.id;
				input.dispatchEvent(new Event('change', { bubbles: true }));
			});
		}

		updatePickupAvailability() {
			const pickUpAvailability = document.querySelector('pickup-availability');
			if (!pickUpAvailability) return;

			if (this.currentVariant && this.currentVariant.available) {
				pickUpAvailability.fetchAvailability(this.currentVariant.id);
			} else {
				pickUpAvailability.removeAttribute('available');
				pickUpAvailability.innerHTML = '';
			}
		}

		removeErrorMessage() {
      this.buyButtons.forEach((button) => {
        button.handleErrorMessage();
      })
		}

		renderProductInfo() {
			const classes = {
				onSale: 'x-price--on-sale',
				soldOut: 'x-price--sold-out',
				hide: 'x-hidden',
				visibilityHidden: 'x-visibility-hidden'
			}
			const selectors = {
				priceWrapper: '.x-price',
				salePrice: '.x-price-item--sale',
				compareAtPrice: ['.x-price-item--regular'],
				unitPrice: '.x-price__unit-wrapper',
				saleBadge: '.x-price__badge-sale',
				saleAmount: '[data-sale-value]'
			}
			const {money_format} = window.Foxify.Settings
			const {
				priceWrapper,
				salePrice,
				unitPrice,
				compareAtPrice,
				saleBadge,
				saleAmount
			} = this.Utils.queryDomNodes(selectors, this.section)

			const {compare_at_price, price, unit_price_measurement} = this.currentVariant

			this.toggleAddButton(!this.currentVariant.available, window.Foxify.Strings.soldOut);

			const onSale = compare_at_price && compare_at_price > price
			const soldOut = !this.currentVariant.available

			if (onSale) {
				priceWrapper.classList.add(classes.onSale)
			} else {
				priceWrapper.classList.remove(classes.onSale)
			}

			if (soldOut) {
				priceWrapper.classList.add(classes.soldOut)
			} else {
				priceWrapper.classList.remove(classes.soldOut)
			}

			if (priceWrapper) priceWrapper.classList.remove(classes.visibilityHidden)
			if (salePrice) salePrice.innerHTML = this.Utils.formatMoney(price, money_format)

			if (compareAtPrice && compareAtPrice.length && compare_at_price > price) {
				compareAtPrice.forEach(item => item.innerHTML = this.Utils.formatMoney(compare_at_price, money_format))
			} else {
				compareAtPrice.forEach(item => item.innerHTML = this.Utils.formatMoney(price, money_format))
			}

			if (unit_price_measurement && unitPrice) {
				unitPrice.classList.remove(classes.hide)
				const unitPriceContent = `<span>${this.Utils.formatMoney(this.currentVariant.unit_price, money_format)}</span>/<span data-unit-price-base-unit>${this._getBaseUnit()}</span>`
				unitPrice.innerHTML = unitPriceContent
			} else {
				unitPrice?.classList.add(classes.hide)
			}

      if (saleBadge && compare_at_price > price) {
        const type = saleBadge.dataset.type
        if (type === 'text') return
        let value
        if (type === 'percentage') {
          const saving = (compare_at_price - price) * 100 / compare_at_price
          value = Math.round(saving) + '%'
        }
        if (type === 'fixed_amount') {
          value = this.Utils.formatMoney(compare_at_price - price, money_format)
        }

        saleAmount.innerHTML = window.Foxify.Strings.savePriceHtml?.replace(/\{\{\s*amount\s*\}\}/g, value)
      }

    }

		_getBaseUnit = () => {
			return this.currentVariant.unit_price_measurement.reference_value === 1
				? this.currentVariant.unit_price_measurement.reference_unit
				: this.currentVariant.unit_price_measurement.reference_value +
				this.currentVariant.unit_price_measurement.reference_unit
		}

		updateProductMeta() {
			const {available, sku, noSku} = this.currentVariant
			const {inStock, outOfStock} = window.Foxify.Strings
			const {productAvailability, productSku} = this.domNodes;

			if (productSku) {
				if (sku) {
					productSku.textContent = sku
				} else {
					productSku.textContent = noSku
				}
			}

			if (productAvailability) {
				if (available) {
					productAvailability.textContent = inStock
					productAvailability.classList.remove('out-of-stock')
				} else {
					productAvailability.textContent = outOfStock
					productAvailability.classList.add('out-of-stock')
				}
			}
		}

		toggleAddButton(disable = true, text, modifyClass = true) {
			this.buyButtons.forEach(button => {
				const btnLabel = button.querySelector('.x-btn__label')
				if (disable) {
          button.setAttribute('disabled', 'true')
					if (text) btnLabel.textContent = text
				} else {
          button.removeAttribute('disabled')
					btnLabel.innerHTML = window.Foxify.Strings.addToCart
				}
			})
      // if (!modifyClass) return;
		}

		setUnavailable() {
      const priceWrapper = this.section.querySelector('.x-price')
      if (priceWrapper) priceWrapper.classList.add('x-visibility-hidden')
      this.toggleAddButton(true, window.Foxify.Strings.unavailable)
		}

		initOptionSwatches() {
			const {optionsSwatches} = window.Foxify.Extensions
			const optionNodes = this.querySelectorAll('.x-variant-picker__option')
      optionNodes.length && optionNodes.forEach(optNode => {
        let customImage, customColor_1, customColor_2
        const {value, fallbackValue, optionType} = optNode.dataset
        if (optionType === 'color') {
          const check = optionsSwatches.options.find(c => c.title.toLowerCase() === value.toLowerCase())
          customColor_1 = check ? check.color_1 : ''
          customColor_2 = check ? check.color_2 : ''
          customImage = check ? check.image : ''

          if (customColor_1) {
            optNode.style.setProperty('--option-color-1', `${customColor_1}`)
          }
          if (customColor_2) {
            optNode.style.setProperty('--option-color-2', `${customColor_2}`)
          }

          if (!customColor_1 && !customColor_2 && window.Foxify.Utils.isValidColor(fallbackValue)) {
            optNode.style.setProperty('--option-color-1', `${fallbackValue}`)
          }

          if (customImage) {
            optNode.querySelector('label').classList.add('has-image')
            optNode.querySelector('label').style.backgroundImage = `url(${window.Foxify.Utils.getSizedImageUrl(customImage, '100x100')})`
          }
          return false;
        }
      })
		}


		getVariantData() {
			this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
			return this.variantData;
		}
	}
	customElements.define('x-variant-picker', VariantPicker);
}
