; (() => {

  document.addEventListener('DOMContentLoaded', () => {

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

    // Модальное окно - увеличенная репродукция с описанием
    const conteinerImg = document.querySelector(`.js-gallery-img`);
    const conteinerModal = document.querySelector(`.js-gallery-modal`);
    const btnClosedEl = conteinerModal.querySelector(`button`);


    conteinerImg.addEventListener(`click`, (ev) => {
      const selectedImgEl = ev.target.children[0];
      const authorData = selectedImgEl.dataset.author;
      const workData = selectedImgEl.dataset.work;
      const dateData = selectedImgEl.dataset.date;
      const descriptionData = selectedImgEl.dataset.description;

      conteinerModal.style.display = `block`;
      console.log(selectedImgEl.getAttribute(`src`));

      conteinerModal.querySelector(`img`).setAttribute(`src`, selectedImgEl.getAttribute(`src`))

      btnClosedEl.addEventListener(`click`, () => {
        conteinerModal.removeAttribute(`style`);
      });
    });


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
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 0
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
    let swiperGallery;
    // перезапуск 
    const BP_GALLERY = 650;
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

    /* tabs menu */
    function switchTab(menu, tab) {
      let items = menu.querySelectorAll('button');
      let currIndex;

      [].forEach.call(items, (item, index) => {
        item.classList.remove('js-active-tab');
        if (item === tab) {
          item.classList.add('js-active-tab');
          currIndex = index;
        };
      });

      return currIndex;
    }

    function switchBlock(currIndex, tabItem) {
      const blocks = tabItem.querySelectorAll('.tab__item');

      [].forEach.call(blocks, (block, index) => {
        block.removeAttribute('style');
        if (index == currIndex) {
          block.style.display = 'block';

          // переход к открываемому блоку на разрешении меньше 1001
          const BP_TAB = 1001;
          const viewportWidth = Math.trunc(window.visualViewport.width);
          if (viewportWidth < BP_TAB) {
            console.log(viewportWidth);
            const outBlockValue = block.getBoundingClientRect().top + pageYOffset;
            window.scrollTo({ top: outBlockValue, behavior: "smooth" });
          }
        };
      });

    };

    function creatTab(tabMenuNode, tabContainerNode) {
      const tabsmenu = document.querySelectorAll(tabMenuNode);
      if (!tabsmenu) return;
      const content = document.querySelector(tabContainerNode);
      const activDefaultBlockEl = content.querySelectorAll('.tab__item')[0];

      activDefaultBlockEl.style.display = 'block';

      [].forEach.call(tabsmenu, (menu) => {
        menu.addEventListener('click', (el) => {
          if (el.target.tagName === 'BUTTON') {

            const currIndex = switchTab(menu, el.target);
            switchBlock(currIndex, content);
          };
        });
      });
    };

    creatTab('.js-tabs-menu-fr', ".js-tabs-container-fr");
    creatTab('.js-tabs-menu-de', ".js-tabs-container-de");
    creatTab('.js-tabs-menu-it', ".js-tabs-container-it");
    creatTab('.js-tabs-menu-ru', ".js-tabs-container-ru");
    creatTab('.js-tabs-menu-bel', ".js-tabs-container-bel");

    const createTab = (dataTabsEl) => {
      const tabsEl = document.querySelector(dataTabsEl);
      const tabSwitchAllEl = tabsEl.querySelectorAll(`[data-tab-switch]`);
      const tabAllEl = tabsEl.querySelectorAll(`[data-tab-open]`);
      const removeAttr = (elemensAll, element, indexEl) => {
        element.setAttribute(`data-tab-switch`, `false`);
        element.classList.remove(`activ`);
        elemensAll[indexEl].setAttribute(`data-tab-open`, `false`);
        elemensAll[indexEl].classList.remove(`activ`);
      };

      tabSwitchAllEl.forEach((el, index) => {
        el.addEventListener(`click`, (ev) => {
          ev.preventDefault();
          const el = ev.currentTarget;

          if (el.getAttribute(`data-tab-switch`) === `true`) {
            removeAttr(tabAllEl, el, index);
            return
          };

          tabSwitchAllEl.forEach((e, i) => {
            if (e.getAttribute(`data-tab-switch`)) {
              removeAttr(tabAllEl, e, i)
            }
          });

          el.setAttribute(`data-tab-switch`, `true`);
          el.classList.add(`activ`);

          setTimeout(() => {
            tabAllEl[index].setAttribute(`data-tab-open`, `true`);
            tabAllEl[index].classList.add(`activ`)
          }, 20)
        })
      })
    };
    createTab(`.js-catalog__tab`);

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