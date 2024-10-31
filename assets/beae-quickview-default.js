window.BEAEPAGEJS = () => { let BeaeUseHooks = {};
      try {
        let argid = 'beae-4yaxq408section-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-4yaxq408',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-4yaxq408');
        args.el = args.els[0];
        ((data) => { data.el.querySelector(".beae-grid-system")?.addEventListener("scroll", (e) => {
    let el = e.target;
    if (!el.classList.contains("beae-grid-carousel")) {
      return;
    }
    let activePage = Math.round((el.scrollLeft + el.querySelector(".beae-grid-carousel__snaps").offsetLeft) / (el.offsetWidth * 0.8)) + 1;
    data.el.querySelector(".beae-grid-carousel__pagination div.active")?.classList.remove("active");
    data.el.querySelector('.beae-grid-carousel__pagination div[data-index="' + activePage + '"]')?.classList.add("active");
  });
  if (data.mode.value == "live") {
    const videoContainer = data.el.querySelector('.beae-section-background-video[data-device="desktop"]');
    const videoMobileContainer = data.el.querySelector('.beae-section-background-video[data-device="mobile"]');
    const initVideoBackground = [];
    if (window.BEAEVIDEO && window.BEAEVIDEO.convertBackgroundSection) {
      if (window.innerWidth >= 768) {
        if (videoContainer) {
          const rs = window.BEAEVIDEO.convertBackgroundSection(data.optionsVideo, videoContainer);
          if (rs) {
            videoContainer.innerHTML = rs.html;
            initVideoBackground.push("desktop");
          }
        }
      } else {
        if (videoMobileContainer) {
          const rs = window.BEAEVIDEO.convertBackgroundSection(data.optionsVideoMobile, videoMobileContainer);
          if (rs) {
            videoMobileContainer.innerHTML = rs.html;
            initVideoBackground.push("mobile");
          }
        }
      }
    }
    if (videoContainer || videoMobileContainer) {
      window.addEventListener("resize", () => {
        if (window.BEAEVIDEO && window.BEAEVIDEO.convertBackgroundSection) {
          if (!initVideoBackground.includes("desktop") && window.innerWidth >= 768 && videoContainer) {
            const rs = window.BEAEVIDEO.convertBackgroundSection(data.optionsVideo, videoContainer);
            if (rs) {
              videoContainer.innerHTML = rs.html;
              initVideoBackground.push("desktop");
            }
          }
          if (!initVideoBackground.includes("mobile") && window.innerWidth < 768 && videoMobileContainer) {
            const rs = window.BEAEVIDEO.convertBackgroundSection(data.optionsVideoMobile, videoMobileContainer);
            if (rs) {
              videoMobileContainer.innerHTML = rs.html;
              initVideoBackground.push("mobile");
            }
          }
        }
      });
    }
  } })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-4yaxq408: ', ex)
      };
    

      try {
        let argid = 'beae-4yaxq408section-featured-product',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-4yaxq408',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-4yaxq408');
        args.el = args.els[0];
        ((data) => { const productWrp = data.el.querySelector("#product-json-" + data.id);
  const product = JSON.parse(productWrp?.innerHTML ? productWrp?.innerHTML : "{}");
  let selectedVariant = product?.selected_or_first_available_variant;
  if (!window.BeaeMoneyFormat) {
    window.BeaeMoneyFormat = data.moneyFormat;
  }
  if (data.mode.value === "builder") {
    updateInventory(selectedVariant);
  }
  function updatePrice(variant) {
    const priceDom = data.el.querySelector(".beae-product-single__price");
    const compareAtPriceDom = data.el.querySelector(".beae-product-single__price--regular");
    if (priceDom) {
      priceDom.innerHTML = window.BeaeFormatMoney(variant.price);
    }
    if (compareAtPriceDom) {
      if (variant.compare_at_price) {
        compareAtPriceDom.style.display = "block";
        compareAtPriceDom.innerHTML = window.BeaeFormatMoney(variant.compare_at_price);
      } else {
        compareAtPriceDom.style.display = "none";
      }
    }
  }
  function updateBagedPrice(variant) {
    const priceBaged = data.el.querySelector(".beae-product-single__price--badged");
    if (priceBaged) {
      const badgedType = priceBaged.getAttribute("type");
      let sale = "Sale";
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        priceBaged.style.display = "block";
        switch (badgedType) {
          case "percent":
            const percent = (variant.compare_at_price - variant.price) * 100 / variant.compare_at_price;
            sale = `Save ${Math.floor(percent)}%`;
            break;
          case "dollar":
            sale = "Save " + window.BeaeFormatMoney(variant.compare_at_price - variant.price);
            break;
        }
        priceBaged.innerHTML = sale;
      } else {
        priceBaged.innerHTML = "";
        priceBaged.style.display = "none";
      }
    }
  }
  function updateImageSlider(variant) {
    const productMediaWrp = data.el.querySelector(
      ".beae-x-product-gallery .beae-slider"
    );
    if (productMediaWrp && product && variant.featured_media) {
      productMediaWrp.dispatchEvent(
        new CustomEvent("activeSlide", {
          detail: {
            id: variant.featured_media.id
          },
          bubbles: true,
          cancelable: true,
          composed: false
        })
      );
    }
  }
  function updateInventory(variant) {
    const inventoryWrp = data.el.querySelector(".beae-x-inventory");
    if (!inventoryWrp || !variant)
      return;
    const inventoryElement = inventoryWrp.children[0];
    const inStockText = inventoryWrp.getAttribute("data-in-stock-text");
    const outStockText = inventoryWrp.getAttribute("data-out-stock-text");
    const inventoryText = inventoryWrp.getAttribute("data-inventory-text");
    const preOrderText = inventoryWrp.getAttribute("data-pre-order-text");
    const veryLowText = inventoryWrp.getAttribute("data-very-low-stock-text");
    const lowText = inventoryWrp.getAttribute("data-low-stock-text");
    const incomingDateText = inventoryWrp.getAttribute("data-incoming-date-text");
    const lowNumber = inventoryWrp.getAttribute("data-low-number") ?? 20;
    const veryLowNumber = inventoryWrp.getAttribute("data-very-low-number") ?? 5;
    const showNextIncomingDate = inventoryWrp.getAttribute("data-show-next-incoming-date");
    const maxNumber = inventoryWrp.getAttribute("data-max-number") ?? 60;
    const inventoryLabel = inventoryWrp.querySelector(".beae-inventory-label");
    const process = inventoryWrp.querySelector(".beae-inventory-process-body");
    function replaceText(text) {
      if (!text)
        return "";
      return text.replace("{quantity}", variant.inventory_quantity).replace("{next_incoming_date}", variant.next_incoming_date);
    }
    if (!inventoryElement || !inventoryLabel)
      return;
    if (!variant.available) {
      if (variant.next_incoming_date && showNextIncomingDate) {
        inventoryLabel.innerHTML = replaceText(incomingDateText);
        inventoryElement.classList = "";
        inventoryElement.classList.add("beae-incoming-transfer");
      } else {
        inventoryLabel.innerHTML = replaceText(outStockText);
        inventoryElement.classList = "";
        inventoryElement.classList.add("beae-inventory-out-stock");
      }
    } else {
      if (variant.inventory_policy === "continue" && variant.inventory_quantity < 1) {
        inventoryLabel.innerHTML = replaceText(preOrderText);
        inventoryElement.classList = "";
        inventoryElement.classList.add("beae-inventory-pre-order");
      } else {
        if (variant.inventory_quantity <= veryLowNumber) {
          inventoryLabel.innerHTML = replaceText(veryLowText);
          inventoryElement.classList = "";
          inventoryElement.classList.add("beae-inventory-very-low");
        } else if (variant.inventory_quantity <= lowNumber) {
          inventoryLabel.innerHTML = replaceText(lowText);
          inventoryElement.classList = "";
          inventoryElement.classList.add("beae-inventory-low");
        } else {
          inventoryLabel.innerHTML = replaceText(inStockText);
          inventoryElement.classList = "";
          inventoryElement.classList.add("beae-inventory-in-stock");
        }
      }
    }
    if (process) {
      if (variant.inventory_quantity <= maxNumber) {
        process.style.width = variant.inventory_quantity / maxNumber * 100 + "%";
      } else {
        process.style.width = "100%";
      }
    }
  }
  function updateBuyButton(variant) {
    const addToCartWrp = data.el.querySelector(".beae-add-to-cart--submit");
    if (addToCartWrp) {
      const content = addToCartWrp.querySelector(".beae-add-to-cart-text-content");
      if (variant.available) {
        if (addToCartWrp) {
          addToCartWrp.removeAttribute("disabled");
          if (content) {
            content.innerHTML = addToCartWrp.getAttribute(
              "data-add-to-cart-text"
            );
          }
        }
      } else {
        if (addToCartWrp) {
          addToCartWrp.setAttribute("disabled", "disabled");
          if (content) {
            content.innerHTML = addToCartWrp.getAttribute(
              "data-sold-out-text"
            );
          }
        }
      }
    }
    const checkoutBtn = data.el.querySelector(".shopify-payment-button__button");
    if (checkoutBtn) {
      if (variant.inventory_quantity > 0) {
        checkoutBtn.removeAttribute("disabled");
      } else {
        checkoutBtn.setAttribute("disabled", "disabled");
      }
    }
  }
  function updateQuantity(variant) {
    const $quantity = data.el.querySelector(".beae-quantity-input"), $btn_quantity = data.el.querySelectorAll(".beae-quantity-btn");
    if ($btn_quantity) {
      $btn_quantity.forEach((x) => {
        if (!variant) {
          x.setAttribute("disabled", "disabled");
        } else if (!variant.available) {
          x.setAttribute("disabled", "disabled");
        } else {
          x.removeAttribute("disabled");
        }
      });
    }
    if ($quantity) {
      if (!variant) {
        $quantity.value = 1;
        $quantity.setAttribute("disabled", "disabled");
        return;
      } else if (!variant.available) {
        $quantity.setAttribute("disabled", "disabled");
      } else {
        $quantity.removeAttribute("disabled");
      }
      const inventory_quantity = variant.inventory_quantity;
      const policy = variant.inventory_policy;
      let max = 9999;
      if (variant.inventory_management && policy === "deny") {
        max = inventory_quantity;
      }
      if (inventory_quantity < 1 && policy == "continue") {
        max = 999999;
      }
      let quantity = parseInt($quantity.value);
      if (quantity > max) {
        quantity = max;
      }
      quantity = isNaN(quantity) || !quantity ? 1 : quantity;
      $quantity.value = quantity;
      $quantity.setAttribute("max", max);
    }
  }
  function updateLocalPickup(variant) {
    if (variant) {
      let localPickUpWrp = data.el.querySelector(".beae-pa-container");
      if (localPickUpWrp) {
        if (data.mode.value == "live") {
          const sectionIdTemplate = localPickUpWrp.getAttribute("data-section-id-template");
          localPickUpWrp.innerHTML = "";
          window.fetch(
            (window.BEAE.routes.root_url ? window.BEAE.routes.root_url : "/") + "variants/" + variant.id + "/?section_id=" + sectionIdTemplate,
            {
              method: "GET",
              headers: {
                "Content-Type": "text/html"
              }
            }
          ).then((response) => response.text()).then((text) => {
            let html = text.match(/<Beae-custom-liquid-pickup>(|[\s\S]+?)<\/Beae-custom-liquid-pickup>/g);
            if (html && html[0]) {
              localPickUpWrp.innerHTML = html[0];
            }
            let btnPopup = localPickUpWrp.querySelector(".beae-pa--btn"), contentPopup = localPickUpWrp.querySelector(".beae-pa--detail");
            if (btnPopup) {
              const section = localPickUpWrp.closest("section.beae-section");
              let sectionId = "";
              if (section) {
                sectionId = section.getAttribute("data-sectionid");
              }
              btnPopup.addEventListener("click", () => {
                window.BeaePopupLibrary.createPopup(contentPopup, {
                  layout: localPickUpWrp.getAttribute("data-layout"),
                  layoutMobile: "bottom",
                  width: localPickUpWrp.getAttribute("data-width"),
                  id: data.id
                });
              });
            }
          }).catch((err) => {
            console.warn(err.message);
          });
        }
      }
    }
  }
  const sizeGuideWrp = data.el.querySelector(".beae-variant-size-guide");
  if (sizeGuideWrp) {
    const sizeGuideBtn = sizeGuideWrp.querySelector(
      ".beae-variant-size-guide-btn"
    );
    const sizeGuideContent = sizeGuideWrp.querySelector(
      ".beae-variant-size-guide-content"
    );
    if (sizeGuideBtn && sizeGuideContent) {
      const sectionId = data.el.getAttribute("data-sectionid");
      sizeGuideBtn.addEventListener("click", () => {
        if (window?.BeaePopupLibrary) {
          window.BeaePopupLibrary.createPopup(sizeGuideContent, {
            layout: "center",
            layoutMobile: "bottom",
            width: "auto",
            sectionId
          });
        }
      });
    }
  }
  const dropdownSelected = data.el.querySelectorAll(".beae-custom-select_wrp");
  if (dropdownSelected && dropdownSelected.length && data.mode.value == "live") {
    dropdownSelected.forEach((selectWrp) => {
      const dropdownSelectedBtn = selectWrp.querySelector("button.beae-custom-select__btn");
      const wrpDropdown = selectWrp.closest("div.beae-block.beae-core");
      dropdownSelectedBtn.addEventListener("click", function(event) {
        selectWrp.classList.toggle("active");
        wrpDropdown.style.position = "relative";
        wrpDropdown.style.zIndex = "1";
      });
      document.addEventListener("click", function(event) {
        if (!selectWrp.contains(event.target)) {
          selectWrp.classList.remove("active");
          wrpDropdown.style = {};
        }
      });
    });
  }
  function closeSelectedActive() {
    const activeSelected = data.el.querySelector(".beae-custom-select_wrp.active");
    if (activeSelected) {
      activeSelected.classList.remove("active");
    }
  }
  const variantBlock = data.el.querySelector(".beae-x-variant");
  let isInit = false;
  if (variantBlock) {
    let findVariantsByOptions = function(variant, option) {
      if (!variant) {
        return [];
      }
      let optionsValue = variant.options.filter(
        (item, index) => index != option
      );
      return product.variants.filter((v) => {
        return optionsValue.every((item) => {
          return v.options.includes(item);
        });
      }) ?? [];
    }, findVariantByOptionAndValue = function(variant, option, value) {
      if (!variant) {
        return null;
      }
      let optionsValue = variant.options.filter(
        (item, index) => index != option
      );
      return product.variants.find((v) => {
        return v.options.every((o) => [value, ...optionsValue].includes(o));
      });
    }, updateVariant = function(variant) {
      if (!variant)
        return;
      variantBlock.querySelectorAll(".beae-variant-label").forEach((label) => {
        const optionPosition = parseInt(label.getAttribute("data-option-position")) - 1;
        label.innerHTML = variant.options[optionPosition];
      });
      if (!selectImg) {
        variantBlock.querySelectorAll(".beae-product-images-list").forEach((swatch) => {
          const optionPosition = parseInt(swatch.getAttribute("data-option-position")) - 1;
          let swatchContent = [];
          findVariantsByOptions(variant, optionPosition).forEach((v) => {
            swatchContent.push(`
                  <span
                    class="beae-product-swatch-item-image"
                    variant-id=${v.id}
                  >
                    <img
                      src="${v.featured_image ? v.featured_image.src : "//cdn.shopify.com/shopifycloud/shopify/assets/no-image-160-1cfae84eca4ba66892099dcd26e604f5801fdadb3693bc9977f476aa160931ac_120x120_crop_center.gif"}"
                      alt="${v.title}"
                      height="120"
                      width="120"
                      loading="lazy"
                    />
                  </span>
                `);
          });
          swatch.querySelectorAll(".beae-product-variant-item-image").forEach((item, index) => {
            item.innerHTML = swatchContent[index];
          });
        });
      }
      variantBlock.querySelectorAll(".beae-product-variant-item").forEach((swatch) => {
        const optionPosition = parseInt(swatch.getAttribute("data-option-position")) - 1;
        const optionValue = swatch.getAttribute("data-value") ?? "";
        const v = findVariantByOptionAndValue(variant, optionPosition, optionValue);
        if (v) {
          swatch.setAttribute("data-variant-id", v.id);
          if (v.inventory_quantity < 1) {
            swatch.classList.add("variant-item-disable");
          } else {
            swatch.classList.remove("variant-item-disable");
          }
        }
      });
    }, selectCallback = function(variant, selector2) {
      if (!variant) {
        return;
      }
      selectedVariant = variant;
      updateInventory(variant);
      updateQuantity(variant);
      updateBuyButton(variant);
      if (firstLoad)
        return;
      updateVariant(variant);
      updatePrice(variant);
      updateBagedPrice(variant);
      updateImageSlider(variant);
      updateLocalPickup(variant);
    };
    let firstLoad = true, selectImg = false, selector = variantBlock.querySelector('[name="id"]');
    const selectorId = selector && selector.getAttribute("id");
    if (selector && window.Shopify && window.Shopify.OptionSelectors) {
      let handleSelectedVariant = function(swatch) {
        firstLoad = false;
        const index = parseInt(swatch.getAttribute("data-option-position")) - 1;
        const select = variantBlock.querySelector(
          "select#" + selectorId + "-option-" + index
        );
        const value = swatch.getAttribute("data-value") ?? swatch.value;
        if (select) {
          const siblings = swatch.parentElement?.children ?? [];
          for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove("beae-product-variant-item--selected");
          }
          swatch.classList.add("beae-product-variant-item--selected");
          select.value = value;
          select.onchange();
        }
        const wrpCustomSelect = swatch.closest(".beae-custom-select_wrp");
        if (wrpCustomSelect) {
          const color = swatch.getAttribute("data-color");
          const colorSelected = wrpCustomSelect.querySelector(".beae-selected-color");
          if (colorSelected) {
            colorSelected.style = "--beae-color-variant: " + color;
          }
          const textSelected = wrpCustomSelect.querySelector(".beae-text-selected");
          if (textSelected) {
            textSelected.innerHTML = value;
          }
        }
      };
      const mySelector = new window.Shopify.OptionSelectors(selectorId, {
        product,
        onVariantSelected: selectCallback,
        enableHistoryState: data.mode.value == "live" ? true : false
      });
      variantBlock.querySelectorAll(".beae-product-variant-item").forEach((swatch) => {
        swatch.addEventListener("click", function(e) {
          selectImg = false;
          handleSelectedVariant(swatch);
          closeSelectedActive();
        });
      });
      variantBlock.querySelectorAll(".beae-product-variant-item-image").forEach((swatch) => {
        swatch.addEventListener("click", function(e) {
          selectImg = true;
          handleSelectedVariant(swatch);
        });
      });
    }
  } else {
    isInit = true;
  }
  if (product.has_only_default_variant) {
    isInit = true;
  }
  if (isInit) {
    initValueProduct();
  }
  function initValueProduct() {
    if (selectedVariant) {
      updateInventory(selectedVariant);
      updateQuantity(selectedVariant);
      updateBuyButton(selectedVariant);
    }
  } })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-4yaxq408: ', ex)
      };
    

      try {
        let argid = 'beae-ud80jlf1block-gallery',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ud80jlf1',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ud80jlf1');
        args.el = args.els[0];
        ((data) => { setTimeout(() => {
    if (!data.el.querySelector("button.beae-media-zoom")) {
      return;
    }
    data.el.querySelectorAll("button.beae-media-zoom").forEach((zoomButton) => zoomButton.addEventListener("click", (e) => {
      if (data.mode.value === "builder") {
      }
      if (zoomButton.closest(".beae-slider-items")) {
        data.el.querySelectorAll(".beae-slider-items>*.active").forEach((slide) => slide.classList.remove("active"));
        zoomButton.parentNode.classList.add("active");
      }
      let zoomWrp = document.createElement("div"), slides = data.el.querySelectorAll("div.beae-slider-items > *"), slidesContent = data.el.querySelector("div.beae-slider-content").getBoundingClientRect();
      zoomWrp.setAttribute("class", `beae-sections beae-content-wrapper`);
      zoomWrp.innerHTML = `
        <div class="${data.id}">
          <div class="beae-gallery-zoom">
            <div class="beae-gallery-zoom-content" style="transform-origin: ${slidesContent.left}px ${slidesContent.top + slidesContent.height / 2}px;">
              <div class="beae-gallery-zoom-items">
                ${Array.from(slides).map((slide, i) => {
        return `
                    <div class="beae-gallery-zoom-item${slide.classList.contains("active") ? " active" : ""}" style="${slide.classList.contains("active") ? "order: -1;" : ""}">
                      ${slide.innerHTML}
                    </div>
                  `;
      }).join("")}
              </div>
            </div>
            <div class="beae-gallery-zoom-controls">
              <div class="beae-gallery-zoom-pagination">
                <button class="pagination_item prev">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
                <span class="pagination_item per">0 / 0</span>
                <button class="pagination_item next">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <button class="beae-gallery-zoom-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(zoomWrp);
      document.body.style.overflow = "hidden";
      let closeBtn = zoomWrp.querySelector("button.beae-gallery-zoom-close"), zoomMain = zoomWrp.querySelector(".beae-gallery-zoom"), zoomContent = zoomWrp.querySelector(".beae-gallery-zoom-content"), paginationPer = zoomWrp.querySelector(".beae-gallery-zoom-pagination .pagination_item.per"), paginationPrev = zoomWrp.querySelector(".pagination_item.prev"), paginationNext = zoomWrp.querySelector(".pagination_item.next"), zoomItems = zoomWrp.querySelectorAll(".beae-gallery-zoom-item");
      let stateActiveSlide = () => {
        let activeSlide = zoomWrp.querySelector(".beae-gallery-zoom-item.active");
        paginationPer.textContent = `${Array.from(zoomWrp.querySelectorAll(".beae-gallery-zoom-item")).indexOf(activeSlide) + 1} / ${slides.length}`;
      };
      stateActiveSlide();
      closeBtn.addEventListener("click", (e2) => {
        zoomMain.classList.remove("opened");
      });
      zoomWrp.querySelectorAll(".beae-gallery-zoom-item img").forEach((img) => {
        img.addEventListener("mousemove", (e2) => {
          if (!img.parentNode.classList.contains("beae-gallery-zoom-more")) {
            img.parentNode.classList.add("beae-gallery-zoom-more");
            img.style.cursor = "zoom-in";
            img.addEventListener("click", (e3) => {
              if (img.style.objectFit === "cover") {
                img.style.objectFit = "contain";
                e3.target.style.transition = "";
                img.style.cursor = "zoom-in";
                img.style.objectPosition = "";
              } else {
                img.style.objectFit = "cover";
                img.style.cursor = "zoom-out";
                img.style.objectPosition = 100 * ((e3.clientX - img.offsetLeft) / img.offsetWidth) + "% " + 100 * ((e3.clientY - img.offsetTop) / img.offsetHeight) + "%";
              }
            });
          } else if (img.parentNode.classList.contains("beae-gallery-zoom-more")) {
            if (img.style.objectFit === "cover") {
              img.style.objectPosition = 100 * ((e2.clientX - img.offsetLeft) / img.offsetWidth) + "% " + 100 * ((e2.clientY - img.offsetTop) / img.offsetHeight) + "%";
            } else if (img.style.objectPosition) {
              img.style.objectPosition = "";
            }
          }
        });
      });
      zoomMain.addEventListener("transitionend", (e2) => {
        if (e2.propertyName !== "opacity") {
          return;
        }
        if (zoomMain.classList.contains("opened")) {
          closeBtn.style.opacity = 1;
          zoomWrp.querySelectorAll(".beae-gallery-zoom-item img").forEach((img) => {
            img.removeAttribute("srcset");
            img.removeAttribute("sizes");
          });
          zoomWrp.querySelector(".beae-gallery-zoom-item.active").style.order = "";
          zoomContent.scrollTo({ left: zoomWrp.querySelector(".beae-gallery-zoom-item.active").offsetLeft });
        } else {
          zoomWrp.remove();
          document.body.style.overflow = "";
        }
      });
      let unboundTimer = 0;
      zoomContent.addEventListener("scroll", (e2) => {
        clearTimeout(unboundTimer);
        unboundTimer = setTimeout(() => {
          zoomItems.forEach((slide) => {
            if (e2.target.scrollLeft === slide.offsetLeft) {
              slide.classList.add("active");
              stateActiveSlide();
            } else {
              slide.classList.remove("active");
            }
          });
        }, 250);
      });
      paginationPrev.addEventListener("click", () => {
        let activeSlide = zoomWrp.querySelector(".beae-gallery-zoom-item.active");
        if (activeSlide.previousElementSibling) {
          activeSlide.previousElementSibling.classList.add("active");
        } else {
          zoomItems[zoomItems.length - 1].classList.add("active");
        }
        activeSlide.classList.remove("active");
        zoomContent.scrollTo({ behavior: "smooth", left: zoomWrp.querySelector(".beae-gallery-zoom-item.active").offsetLeft });
        stateActiveSlide();
      });
      paginationNext.addEventListener("click", () => {
        let activeSlide = zoomWrp.querySelector(".beae-gallery-zoom-item.active");
        if (activeSlide.nextElementSibling) {
          activeSlide.nextElementSibling.classList.add("active");
        } else {
          zoomItems[0].classList.add("active");
        }
        activeSlide.classList.remove("active");
        zoomContent.scrollTo({ behavior: "smooth", left: zoomWrp.querySelector(".beae-gallery-zoom-item.active").offsetLeft });
        stateActiveSlide();
      });
      setTimeout(() => {
        zoomMain.classList.add("opened");
      }, 10);
    }));
  }, 1e3); })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ud80jlf1: ', ex)
      };
    

      try {
        let argid = 'beae-ud80jlf1section-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ud80jlf1',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ud80jlf1');
        args.el = args.els[0];
        ((data) => { if (window.BeaeSlider) {
            window.BeaeSlider(data);
          } })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ud80jlf1: ', ex)
      };
    

      try {
        let argid = 'beae-baydqhlyblock-description',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-baydqhly',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-baydqhly');
        args.el = args.els[0];
        ((data) => { const content = data.el.querySelector(".beae-des-content");
          if (data.type == "collapsible_tab") {
            const accordion = data.el.querySelector(".beae-des-accordion");
            if (accordion && content) {
              accordion.addEventListener("click", () => {
                if (content) {
                  if (accordion.classList.contains("active")) {
                    accordion.classList.remove("active");
                    content.style.maxHeight = "0";
                  } else {
                    accordion.classList.add("active");
                    content.style.maxHeight = content.scrollHeight + "px";
                  }
                }
              });
            }
          } else if (data.type == "show_with_popup") {
            const header = data.el.querySelector(".beae-des-popup > span");
            const buttonLightbox = data.el.querySelector(".beae-des-popup");
            if (buttonLightbox && content) {
              const section = data.el.closest("section.beae-section");
              let sectionId = "";
              if (section) {
                sectionId = section.getAttribute("data-sectionid");
              }
              let extOptions = {};
              if (data.extendOptions) {
                try {
                  eval(`extOptions = ` + data.extendOptions);
                } catch (e) {
                  extOptions = {};
                  console.error(e);
                }
              }
              buttonLightbox.addEventListener("click", () => {
                window.BeaePopupLibrary.createPopup(
                  '<h3 class="beae-popup__content-title">' + header.innerHTML + "</h3>" + content.innerHTML,
                  {
                    layout: extOptions.layout ? extOptions.layout : "right",
                    width: extOptions.width ? extOptions.width : "400px",
                    layoutMobile: extOptions.layoutMobile ? extOptions.layoutMobile : "bottom",
                    sectionId
                  }
                );
              });
            }
          } else if (data.type == "less_more") {
            const btn = data.el.querySelector(".btn-action-les-more");
            const wrp = data.el.querySelector(".beae-less-more");
            const height = wrp.getAttribute("data-height");
            if (wrp) {
              wrp.style.height = height;
            }
            if (btn && wrp) {
              btn.addEventListener("click", () => {
                const type = btn.getAttribute("data-type");
                if (type == "more") {
                  wrp.classList.remove("beae-show-more");
                  wrp.style.height = height;
                  btn.setAttribute("data-type", "less");
                  btn.innerHTML = btn.getAttribute("data-show-more-text");
                } else {
                  wrp.classList.add("beae-show-more");
                  wrp.style.height = wrp.scrollHeight + "px";
                  setTimeout(() => {
                    wrp.style = {};
                  }, 100);
                  btn.setAttribute("data-type", "more");
                  btn.innerHTML = btn.getAttribute("data-show-less-text");
                }
              });
            }
          }
          function convertStringWithDifferentWordCount(inputString, newWordCount) {
            const words = inputString.split(" ");
            const slicedWords = words.slice(0, newWordCount);
            if (inputString.split(" ").length > newWordCount) {
              return slicedWords.concat("...").join(" ");
            } else {
              return slicedWords.join(" ");
            }
          }
          data.els.forEach((el) => {
            const shortDes = el.querySelector(".beae-x-product-short-des");
            if (shortDes) {
              const shortDesBefore = shortDes.textContent;
              shortDes.innerHTML = convertStringWithDifferentWordCount(
                shortDesBefore,
                data.numberOfWords
              );
            }
          }); })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-baydqhly: ', ex)
      };
    

      try {
        let argid = 'beae-x4gqkt5vblock-buy',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-x4gqkt5v',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-x4gqkt5v');
        args.el = args.els[0];
        ((data) => { const plus = data.el.querySelector('.beae-quantity-btn[name="plus"]');
          const minus = data.el.querySelector('.beae-quantity-btn[name="minus"]');
          const input = data.el.querySelector(".beae-quantity-input");
          if (plus && minus && input) {
            if (input.value === "") {
              input.value = "1";
            }
            plus.addEventListener("click", function() {
              if (plus.getAttribute("disabled") != "disabled") {
                input.stepUp();
              }
            });
            minus.addEventListener("click", function() {
              if (minus.getAttribute("disabled") != "disabled") {
                input.stepDown();
              }
            });
          } })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-x4gqkt5v: ', ex)
      };
    }; if (window.BEAEBASE) {window.BEAEPAGEJS()} 