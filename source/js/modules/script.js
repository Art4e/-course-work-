; (() => {

  document.addEventListener('DOMContentLoaded', () => {

    const setPaddingToBody = (delPadding = false) => {
      const lockPaddingValue = `${window.innerWidth - document.querySelector(`.header`).offsetWidth}px`;
      const bodyEl = document.querySelector(`body`);
      if (delPadding) {
        bodyEl.style.paddingRight = null
      } else bodyEl.style.paddingRight = lockPaddingValue;
    };

    const swiperHead = new Swiper('.hero__slider', {
      autoplay: {
        delay: 3000,
        autoplayDisableOnInteraction: false,
      },
      loop: true,
      effect: 'fade',
      on: {
        resize: function () {
          this.update()
        }
      }
    });

    // Открываем, закрываем бургер меню
    const headUpEl = document.querySelector('.js-head-up');
    headUpEl.addEventListener('click', (ev) => {
      const bodyEl = document.querySelector('body');
      const burgerEl = headUpEl.querySelector('.js-header-burger');
      const burgerBodyEl = burgerEl.querySelector('span');
      const burgerMenuEl = headUpEl.querySelector('.js-header__menu');
      const comeInEl = headUpEl.querySelector('.js-come-in');
      const menuLinksEl = headUpEl.querySelectorAll('a');

      const toggleActivClass = () => {
        burgerMenuEl.classList.toggle('activ');
        burgerBodyEl.classList.toggle('activ');
        comeInEl.classList.toggle('activ');
        burgerEl.classList.toggle('activ');
        !!bodyEl.classList.contains('body_lock') ? setPaddingToBody(true) : setPaddingToBody();
        bodyEl.classList.toggle('body_lock');
      };

      menuLinksEl.forEach(el => {
        if (ev.target === el) toggleActivClass()
      });

      if (ev.target === burgerEl || ev.target === burgerBodyEl) toggleActivClass();
    });

    // Открываем нижнее меню
    ; (() => {
      const downMenuItemsEl = document.querySelectorAll('.js-head-down__menu > li');

      downMenuItemsEl.forEach(el => {
        el.addEventListener(`click`, () => {
          if (el.classList.contains('activ')) {
            el.classList.remove('activ')
            return
          } else {
            downMenuItemsEl.forEach(e => e.classList.remove('activ'));
            el.classList.add('activ');

          }
        })
        // el.onmouseover = () => el.classList.add('activ');
        // el.onmouseout = () => el.classList.remove('activ');
        el.addEventListener('focus', () => el.classList.add('activ'));
        el.addEventListener('blur', () => el.classList.remove('activ'));
      });

    })();

    // Установка брекпоинта (bpUse) в режиме-'max-width', для выполнения функции(exeFn)
    const setBreakPoint = (bpUse, exeFn) => {
      const breakPoint = window.matchMedia(`(max-width:${bpUse}px)`);
      const bpChecker = function () {
        if (breakPoint.matches) {
          exeFn(true);
        } else if (!breakPoint.matches) {
          exeFn(false);
        }
      };

      breakPoint.addListener(bpChecker);
      bpChecker();
    };

    // Изменяем положение поиска на брекпоинте 1050
    ; (() => {
      const openSerch = () => {
        const btnSearchEl = document.querySelector('.js-search__button');
        const inputSearchEl = document.querySelector('.js-search-input');

        btnSearchEl.addEventListener(`click`, (ev) => {
          ev.preventDefault();
          if (btnSearchEl.classList.contains(`_activ`)) {
            btnSearchEl.classList.remove(`_activ`);
            inputSearchEl.classList.remove(`_activ`);
            inputSearchEl.blur()
          } else {
            btnSearchEl.classList.add(`_activ`);
            inputSearchEl.classList.add(`_activ`);
            inputSearchEl.focus()
          }
        });
      };

      const formSearchEl = document.querySelector('.js-header__search'),
        inContainerSearchEl = document.querySelector('.js-head-up'),
        outContainerSearchEl = document.querySelector('.js-head-down');
      const SIZE_SCRIN = 1050;
      const pageWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      if (pageWidth <= SIZE_SCRIN) {
        inContainerSearchEl.append(formSearchEl);
      };

      setBreakPoint(SIZE_SCRIN, (booleanEl) => {
        if (booleanEl) {
          inContainerSearchEl.append(formSearchEl);
          openSerch();
        } else {
          outContainerSearchEl.append(formSearchEl);
          // openSerch(formSearchEl);
        };
      })

    })();

    // Модальные окна
    const addModal = (modalWrapper) => {
      const conteinerModal = document.querySelector(modalWrapper);
      const modalEl = conteinerModal.querySelector(`.js-modal`);
      const btnClosedEl = conteinerModal.querySelector(`.js-modal-close`);
      const bodyEl = document.querySelector('body');

      const togflStyleModal = (styleAdd = true) => {
        if (styleAdd) {
          conteinerModal.classList.add(`_visible`);
          modalEl.classList.add(`_visible`);
          setPaddingToBody();
          bodyEl.classList.add('body_lock');
        }
        if (!styleAdd) {
          conteinerModal.classList.remove(`_visible`);
          modalEl.classList.remove(`_visible`);
          setPaddingToBody(true);
          bodyEl.classList.remove('body_lock');
        }
      }

      togflStyleModal()

      conteinerModal.addEventListener(`click`, (ev) => {
        ev.preventDefault();
        if (ev.target === btnClosedEl) {
          togflStyleModal(false)
        }
        if (!ev.target.closest(`.js-modal`)) {
          togflStyleModal(false)
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') togflStyleModal(false);
      })

      return conteinerModal;
    };

    // const setPaddingToBody = () => {
    //   lockPaddingValue = `${window.innerWidth - document.querySelector(`.header`).offsetWidth}px`
    //   console.log(lockPaddingValue);
    //   body.style.paddingRight = lockPaddingValue;
    // }

    // Репродукция с описанием
    const conteinerImg = document.querySelector(`.js-gallery-img`);

    conteinerImg.addEventListener(`click`, (ev) => {
      const conteinerModal = addModal(`.js-gallery-modal`);

      const selectedImgEl = ev.target.children[0];
      const authorData = selectedImgEl.dataset.author;
      const workData = selectedImgEl.dataset.work;
      const dateData = selectedImgEl.dataset.date;
      const descriptionData = selectedImgEl.dataset.description;

      conteinerModal.querySelector(`img`).setAttribute(`src`, selectedImgEl.getAttribute(`src`));
      conteinerModal.querySelector(`.gallery__modal-author`).innerHTML = authorData;
      conteinerModal.querySelector(`.gallery__modal-work`).innerHTML = workData;
      conteinerModal.querySelector(`.gallery__modal-date`).innerHTML = dateData;
      conteinerModal.querySelector(`.gallery__modal-description`).innerHTML = descriptionData;
    });
    // Модалка после отправки заявки в разделе контакты
    // openModalThanks(successModal)


    // ToolTip
    ; (() => {
      const createToolTip = (dataToolTipEl) => {
        const containerToolTipEl = document.querySelector(dataToolTipEl);
        const toolTipAllEl = containerToolTipEl.querySelectorAll(`[data-tooltip]`);
        const TIME_PERIOD_MS = 3000;
        let timerId;

        const resetToolTipEl = () => {
          toolTipAllEl.forEach(toolT => {
            toolT.classList.remove(`_activ`);
            toolT.innerHTML = ``;
          });
        };

        containerToolTipEl.addEventListener(`click`, (ev) => {
          const e = ev.target;
          const leftEl = e.offsetLeft;
          const widthEl = e.offsetWidth;
          const viewportWindow = +window.innerWidth;
          let paddingLeftEl;
          let widthTollTipeEl;

          const getLeft = () => {
            viewportWindow < 351 ? widthTollTipeEl = 250 : widthTollTipeEl = 350;

            if (leftEl < widthTollTipeEl / 2) {
              paddingLeftEl = widthTollTipeEl / 2 - leftEl;
              return { lEl: `${paddingLeftEl}px`, wEl: `${widthTollTipeEl}px` };
            };

            if (viewportWindow - leftEl - widthEl < widthTollTipeEl / 2) {
              paddingLeftEl = viewportWindow - leftEl - widthEl - widthTollTipeEl / 2;
              return { lEl: `${paddingLeftEl}px`, wEl: `${widthTollTipeEl}px` };
            };
            return { lEl: `auto`, wEl: `${widthTollTipeEl}px` };
          };

          if (e === ev.currentTarget) {
            resetToolTipEl();
            return;
          };

          toolTipAllEl.forEach(el => {
            if (e === el) {
              const ttBodyEl = e.querySelector(`.tooltip-body`);
              const contentTT = e.getAttribute(`data-tooltip`);

              if (contentTT && !ttBodyEl) {
                resetToolTipEl();
                e.classList.add(`_activ`);
                e.innerHTML = `<span class="tooltip-body" style="left:${getLeft().lEl};width:${getLeft().wEl};">${contentTT}</span>`;

                clearInterval(timerId);
                timerId = setInterval(() => {
                  clearInterval(timerId);
                  resetToolTipEl();
                }, TIME_PERIOD_MS);

              } else {
                if (contentTT) resetToolTipEl();
              };
            };
          });
        });
      };

      createToolTip(`.projects__text`)
    })();

    // Отобразить или скыть карточки "СОБЫТИЯ" после первой "линии событий"
    ; (() => {
      const buttonEl = document.querySelector('.js-event-card__btn');
      const devAllCard = document.querySelectorAll('.developments__event-card');

      const setClassDeactivated = (elAll, deactiv = false) => {
        elAll.forEach(el => {
          el.classList.remove('deactivated');
          if (!deactiv && el.offsetTop !== elAll[0].offsetTop) {
            el.classList.add('deactivated');
          };
        });
      };

      setClassDeactivated(devAllCard);

      buttonEl.addEventListener('click', () => {
        const deactivatedEl = document.querySelectorAll('.deactivated');

        if (deactivatedEl.length === 0) {
          setClassDeactivated(devAllCard);
        } else if (deactivatedEl.length !== 0) {
          setClassDeactivated(devAllCard, true);
        };

        buttonEl.remove();
      });

      const BP_DEVELOPMENTS = 1000;
      setBreakPoint(BP_DEVELOPMENTS, () => setClassDeactivated(devAllCard));

      //СЛАЙДЕР - СОБЫТИЯ -----------------------------------------------------------------------------
      const swiperDevelopmentsSettings = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          el: '.developments-slider__pagination',
          bulletElement: 'button',
          clickable: true,
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      };

      const slider = document.querySelector('.developments-slider');
      const BP_DEVELOPMENTS_SWIPER = 650;
      let swiperDevelopments;

      setBreakPoint(BP_DEVELOPMENTS_SWIPER, (bpCheck) => {
        if (bpCheck && slider.dataset.mobile === 'false') {
          swiperDevelopments = new Swiper('.developments-slider', swiperDevelopmentsSettings);
          slider.dataset.mobile = 'true';
        } else {
          slider.dataset.mobile = 'false';
          if (slider.classList.contains('swiper-container-initialized')) {
            swiperDevelopments.destroy();
            setClassDeactivated(devAllCard);
          }
        };
      })
    })();

    //СЛАЙДЕР - ГАЛЕРЕЯ -----------------------------------------------------------------------------
    const swiperGallerySettings = {
      breakpoints: {
        1601: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          slidesPerColumn: 2,
          spaceBetween: 50
        },
        1000: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          slidesPerColumn: 2,
          spaceBetween: 40
        },
        801: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          slidesPerColumn: 2,
          spaceBetween: 50
        },
        // 651: {
        //   slidesPerView: 2,
        //   slidesPerGroup: 2,
        //   slidesPerColumn: 2,
        //   spaceBetween: 30
        // },
        451: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          slidesPerColumn: 2,
          spaceBetween: 30
        },
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 0
        }
      },
      touchEventsTarget: 'wrapper',
      grabCursor: true,
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev'
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд'
      },
      pagination: {
        el: '.slider__pagination',
        clickable: true,
        type: 'fraction'
      },
      on: {
        resize: function () {
          this.update()
        }
      }
    }
    //---------------- инициализации слайдера
    let swiperGallery;
    // перезапуск 
    const BP_GALLERY = 450;
    setBreakPoint(BP_GALLERY, (bpCheck) => {
      swiperGallery = new Swiper('.gallery-slider', swiperGallerySettings);
      if (bpCheck) {
        swiperGallery.destroy();
        swiperGallery = new Swiper('.gallery-slider', swiperGallerySettings);
      } else {
        swiperGallery.destroy();
        swiperGallery = new Swiper('.gallery-slider', swiperGallerySettings);
      };
    })

    //СЛАЙДЕР - ИЗДАНИЯ -----------------------------------------------------------------------------
    const swiperEditionSettings = {
      breakpoints: {
        1201: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 43
        },
        1000: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 42
        },
        500: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0
        }
      },
      navigation: {
        nextEl: '.edition-slider-btn-next',
        prevEl: '.edition-slider-btn-prev'
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд'
      },
      pagination: {
        el: '.edition-slider__pagination',
        clickable: true,
        type: 'fraction'
      },
      on: {
        resize: function () {
          this.update();
        }
      }
    };

    const sliderEd = document.querySelector(`.edition-slider`);
    const BP_EDITION_SWIPER = 650;
    let swiperEdition;

    setBreakPoint(BP_EDITION_SWIPER, (bpCheck) => {

      if (!bpCheck && sliderEd.dataset.mobile === `true`) {
        swiperEdition = new Swiper(`.edition-slider`, swiperEditionSettings);
        sliderEd.dataset.mobile = `false`;
      } else {
        sliderEd.dataset.mobile = `true`;
        if (sliderEd.classList.contains(`swiper-container-initialized`)) {
          swiperEdition.destroy();
        }
      };
    })

    //СЛАЙДЕР - ПАРТНЕРЫ -----------------------------------------------------------------------------
    const swiperPartnersSettings = {
      breakpoints: {
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        },
        1000: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 46
        },
        651: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30
        },
        320: {
          slidesPerView: 1
        },
      },
      navigation: {
        nextEl: '.projects-slider__btn-next',
        prevEl: '.projects-slider__btn-prev'
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд'
      },
      on: {
        resize: function () {
          this.update();
        }
      }
    }
    const swiperPartners = new Swiper('.projects-slider', swiperPartnersSettings);

    // Фильтр категории(раздел ИЗДАНИЯ) включается на разрешении max-650
    const catFilterEl = document.querySelector(`.js-cat-filter`);
    const filterBodyEl = document.querySelector(`.js-filter-body`);
    const checItemAllEl = filterBodyEl.querySelectorAll('li');
    const toggleClassCatEl = () => {
      catFilterEl.classList.toggle(`_activ`);
      filterBodyEl.classList.toggle(`_activ`);
    };
    const toggleClassItemEl = (element) => {
      let el = null;
      element.currentTarget === undefined ? el = element : el = element.currentTarget;

      if (el.querySelector(`input[type=checkbox]`).checked) {
        el.classList.add(`_activ`);
      } else {
        el.classList.remove(`_activ`);
      };
    };

    const BP_CAT = 650;
    setBreakPoint(BP_CAT, (bpCheck) => {
      if (bpCheck) {
        catFilterEl.addEventListener(`click`, toggleClassCatEl);
        checItemAllEl.forEach(checItem => {
          toggleClassItemEl(checItem);
          checItem.addEventListener(`click`, toggleClassItemEl);
        });
      } else {
        catFilterEl.classList.remove(`_activ`);
        filterBodyEl.classList.remove(`_activ`);
        checItemAllEl.forEach(item => { item.classList.remove(`_activ`) });
        catFilterEl.removeEventListener(`click`, toggleClassCatEl);
        checItemAllEl.forEach(checItem => {
          checItem.removeEventListener(`click`, toggleClassItemEl);
        });
      };
    })

      // Раздел gallery (фильтр) - выбор элементов select, применение к ним Choices
      ; (() => {
        const selectEl = document.querySelector('.js-filter-select');
        if (!selectEl) return;
        // selectAllEl.forEach(el => {
        const realism = new Choices(selectEl, {
          searchEnabled: false,
          shouldSort: false,
          position: 'bottom',
          itemSelectText: '',
        });

      })();


    // Изменяем скролл 
    ; (() => {
      const scrollingEl = document.querySelectorAll('.authors__items');

      scrollingEl.forEach(el => {
        new SimpleBar(el, { autoHide: false });
      });
    })();

    // ----------- маска телефона
    const inputTelEl = document.querySelectorAll('input[type="tel"]');
    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(inputTelEl);

    // Обработка формы
    const validateForms = function (selector, rules, successModal, yaGoal) {
      new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function (form) {
          const formData = new FormData(form);
          const xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              console.log('Отправлено');
              addModal(successModal);
            };
          }

          xhr.open('POST', '../mail.php', true);
          xhr.send(formData);

          form.reset();
          // addModal(successModal);
          // fileInput.closest('label').querySelector('span').textContent = 'Прикрепить файл';
        }
      });
    };
    const optionsInput = {
      name: {
        required: true,
        minLength: 3
      },
      phone: {
        required: true
      }
    };

    validateForms(`#contacts__form`, optionsInput, `.js-contacts-modal`, `send goal`);

    // Яндекс карта
    ymaps.ready(init);
    function init() {
      let myMap = new ymaps.Map(`custom__map`, {
        center: [55.7584, 37.6010],
        zoom: 15,
        controls: [],
      });
      myMap.behaviors.disable(`scrollZoom`);
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable(`drag`);
      }

      let myGeoObject = new ymaps.Placemark([55.758463, 37.601079], {

      }, {
        iconLayout: `default#image`,
        iconImageHref: `./img/contacts/marker.svg`,
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10]
      });

      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myGeoObject);
    };

    (function (ELEMENT) {
      ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
      ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) { return null }
        else return this.parentElement.closest(selector)
      };
    }(Element.prototype));

  });

})();