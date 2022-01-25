//-------------------------- ▼ ▼ ▼ GALLERY (lightgallery) ▼ ▼ ▼ ------------------





let gallery = document.querySelectorAll('._gallery');
let galleryLink = document.querySelectorAll('._gallery a');

console.log(galleryLink);

if (gallery) {
	gallery_init();
	mutationObserverHTML()
}

//инициализация галереи
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			plugins: [lgZoom],
			thumbnail: true,
			download: false,
			selector: 'a',
			zoomFromOrigin: false,
			mobileSettings: {
				controls: false, download: false, zoomFromOrigin: true
			},
			getCaptionFromTitleOrAlt: false
		});
	}
}

//отслеживание открытия галереи для блокировки скролла контента страницы
function mutationObserverHTML() {
	// Выбираем целевой элемент
	var target = document.querySelector('html');
	// Конфигурация observer (за какими изменениями наблюдать)
	const config = {
		attributes: true,
	};
	// Колбэк-функция при срабатывании мутации
	const observeHTMLClassLgOn = function (mutationsList, observer) {
		delay = 0;
		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				if (target.classList.contains('lg-on')) {
					body_lock_add(delay);
				} else {
					body_lock_remove(delay)
				}
			}
		}
	};
	// Создаём экземпляр наблюдателя с указанной функцией колбэка
	const mutationObserverHTML = new MutationObserver(observeHTMLClassLgOn);
	// Начинаем наблюдение за настроенными изменениями целевого элемента
	mutationObserverHTML.observe(target, config);
}

//---------------------------- ▲ ▲ ▲ GALLERY ▲ ▲ ▲ ------------------------------
