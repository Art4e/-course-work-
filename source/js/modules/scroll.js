; (() => {
	'use strict';
	const TOP_BORDER = 0;
	const menuEl = document.querySelector(`.js-menu-items`);
	const itemEl = menuEl.querySelectorAll(`[data-section]`);

	const getPageY = (elem) => {
		const box = elem.getBoundingClientRect();
		return box.top + pageYOffset
	};

	itemEl.forEach(el => {
		el.addEventListener(`click`, (ev) => {
			const targetEl = ev.target.dataset.section;
			const sectionEl = document.querySelector(targetEl);

			window.scrollTo({ top: getPageY(sectionEl), behavior: 'smooth' })
		}, { passive: true })
	});
})();