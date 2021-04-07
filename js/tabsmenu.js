/* tabs menu */
; (() => {
	'use strict';

	function switchTab(menu, tab) {
		let items = menu.querySelectorAll('li');
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
			if (index == currIndex) block.style.display = 'block';
		});
	};

	function creatTab(tabMenuNode, tabContainerNode) {
		const tabsmenu = document.querySelectorAll(tabMenuNode);
		if (!tabsmenu) return;
		const content = document.querySelector(tabContainerNode);
		const activDefaultBlockEl = content.querySelectorAll('.tab__item')[ 0 ];

		activDefaultBlockEl.style.display = 'block';

		[].forEach.call(tabsmenu, (menu) => {
			menu.addEventListener('click', (el) => {
				if (el.target.tagName === 'LI') {

					// console.log(menu);
					// console.log(el.target);
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
			elemensAll[ indexEl ].setAttribute(`data-tab-open`, `false`);
			elemensAll[ indexEl ].classList.remove(`activ`);
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
					tabAllEl[ index ].setAttribute(`data-tab-open`, `true`);
					tabAllEl[ index ].classList.add(`activ`)
				}, 20)
			})
		})
	};
	createTab(`.js-catalog__tab`);

})();