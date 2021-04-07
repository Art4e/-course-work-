; (function () {
	'use strict';

	// обеспечиваем короссбраузерноть для использования встроенного
	// в браузеры API requestAnimationFrame
	let requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	// получаем объект menu
	const menu = document.querySelector('.js-menu-items');
	const items = menu.querySelectorAll('.js-click-scroll');
	const containers = document.querySelectorAll('.first-header');
	const TOP_BORDER = 0;

	// высота документа (страницы)
	//определить размер страницы с учетом прокрутки можно, взяв максимум из нескольких свойств
	let pageHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	menu.onclick = function (e) {
		if (e.target.tagName != 'A') return;
		let current = switchLinks(e.target);
		selectContainer(current);
	}

	function switchLinks(el) {
		let current;
		[].forEach.call(items, function (item, index) {
			item.classList.remove('active');
			if (item === el) {
				item.classList.add('active');
				current = index;
			};
		});
		return current;
	};

	// по полученному ранее индексу, находим DIV, который будет прокручиваться
	// к верхней части экрана
	function selectContainer(current) {
		[].forEach.call(containers, function (container, index) {
			if (index == current) {
				let startY = container.getBoundingClientRect().top - TOP_BORDER,
					direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;
				if (direction == 0) return;
				scroll(container, direction);
			};
		});
	};

	function scroll(el, direction) {
		// длительность прокручивания страницы
		const DURATION = 2000;
		const start = new Date().getTime();

		const fn = function () {
			const top = el.getBoundingClientRect().top - TOP_BORDER;
			const now = new Date().getTime() - start;
			let result = Math.round(top * now / DURATION);

			result = (result > direction * top) ? top : (result == 0) ? direction : result;
			if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
				window.scrollBy(0, result);
				requestAnimationFrame(fn);
			}
		}

		requestAnimationFrame(fn);
	}
})();