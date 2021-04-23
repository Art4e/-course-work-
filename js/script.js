; (() => {

  document.addEventListener('DOMContentLoaded', () => {

    const swiperHead = new Swiper('.hero__slider', {

      autoplay: {
        delay: 3000,
        autoplayDisableOnInteraction: false,
      },
      loop: true,
      effect: 'fade'
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
        comeInEl.classList.toggle('btn');
        burgerEl.classList.toggle('activ');
        bodyEl.classList.toggle('body_lock');
      };

      menuLinksEl.forEach(el => { if (ev.target === el) toggleActivClass() });
      if (ev.target == burgerEl || ev.target == burgerBodyEl) toggleActivClass();
    });

    // Открываем нижнее меню
    ; (() => {
      const downMenuItemsEl = document.querySelectorAll('.js-head-down__menu > li');

      downMenuItemsEl.forEach(el => {
        el.onmouseover = (event) => el.classList.add('activ');
        el.onmouseout = (event) => el.classList.remove('activ');
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
      const formSearchEl = document.querySelector('.js-header__search'),
        inContainerSearchEl = document.querySelector('.js-head-up'),
        outContainerSearchEl = document.querySelector('.js-head-down');
      const SIZE_SCRIN = 1050;
      const pageWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      if (pageWidth <= SIZE_SCRIN) inContainerSearchEl.append(formSearchEl);

      setBreakPoint(SIZE_SCRIN, (booleanEl) => {
        if (booleanEl) {
          inContainerSearchEl.append(formSearchEl);
        } else {
          outContainerSearchEl.append(formSearchEl);
        };
      })
    })();

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
              paddingLeftEl = widthTollTipeEl / 2 - leftEl - widthEl;
              return `${paddingLeftEl}px`;
            };

            if (viewportWindow - leftEl - widthEl < widthTollTipeEl / 2) {
              paddingLeftEl = viewportWindow - leftEl - widthTollTipeEl / 2;
              return `${paddingLeftEl}px`;
            };
            return `auto`;
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
                e.innerHTML = `<span class="tooltip-body" style="left:${getLeft()}">${contentTT}</span>`;

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
      const aaa = () => {
        const deactivatedEl = document.querySelectorAll('.deactivated');

        if (deactivatedEl.length === 0) {
          setClassDeactivated(devAllCard);
        } else if (deactivatedEl.length !== 0) {
          setClassDeactivated(devAllCard, true);
        };
      };

      buttonEl.addEventListener('click', aaa);

      const BP_DEVELOPMENTS = 1000;
      setBreakPoint(BP_DEVELOPMENTS, () => setClassDeactivated(devAllCard));

      //СЛАЙДЕР - СОБЫТИЯ -----------------------------------------------------------------------------
      const swiperDevelopmentsSettings = {
        // autoHeight: 'true',
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
        651: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          slidesPerColumn: 2,
          spaceBetween: 30
        },
        320: {
          slidesPerView: 1,
          slidesPerColumn: 1
        }
      },
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
    let swiperGallery = new Swiper('.gallery-slider', swiperGallerySettings);
    // перезапуск 
    const BP_GALLERY = 650;
    setBreakPoint(BP_GALLERY, (bpCheck) => {
      if (bpCheck) {
        swiperGallery.destroy();
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
    // const swiperEdition = new Swiper('.edition-slider ', swiperEditionSettings)

    const sliderEd = document.querySelector(`.edition-slider`);
    const BP_EDITION_SWIPER = 650;
    let swiperEdition;

    setBreakPoint(BP_EDITION_SWIPER, (bpCheck) => {
      console.log(!bpCheck && sliderEd.dataset.mobile === `true`)

      if (!bpCheck && sliderEd.dataset.mobile === `true`) {
        console.log(!bpCheck, sliderEd.dataset.mobile)
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
        500: {
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

      // выбор элементов select, применение к ним Choices
      ; (() => {
        const selectAllEl = document.querySelectorAll('select');
        if (!selectAllEl) return;
        selectAllEl.forEach(el => {
          const realism = new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
          });
        });
      })();

    // Создаем аккардион
    crteatAccordion('.col-right__header');

    // Изменяем скролл 
    ; (() => {
      const scrollingEl = document.querySelectorAll('.authors__items');

      scrollingEl.forEach(el => {
        new SimpleBar(el, { autoHide: false });
      });
    })();

  });

  // Яндекс карта
  ymaps.ready(init);
  function init() {
    let myMap = new ymaps.Map("custom__map", {
      center: [55.7584, 37.6010],
      zoom: 15,
      controls: [],
    });
    myMap.behaviors.disable('scrollZoom');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      myMap.behaviors.disable('drag');
    }

    let myGeoObject = new ymaps.Placemark([55.758463, 37.601079], {

    }, {
      iconLayout: 'default#image',
      iconImageHref: './img/contacts/marker.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10]
    });

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myGeoObject);
  };

})();