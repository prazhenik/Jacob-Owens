//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

//--------------page-slider-------------------


//--------------products-slider-------------------

//--------------homepage-hero-slider-------------------

let offersSlider = new Swiper('.slider_offer', {

	effect: '',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 30,
	autoHeight: true,
	speed: 500,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: ".pagination_offer",
		draggable: true,
		type: 'bullets',
		clickable: true,
	},

});

let imagesSlider = new Swiper('.slider_images', {

	//effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 30,
	autoHeight: true,
	speed: 500,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: ".pagination-offer",
		draggable: true,
		type: 'bullets',
		clickable: true,
	},

});

offersSlider.controller.control = imagesSlider;
imagesSlider.controller.control = offersSlider;

//--------------homepage-hero-slider-------------------

//--------------homepage-team-slider------------------- 

let teamSlider = new Swiper('.slider_team', {

	//effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 5,
	autoHeight: true,
	speed: 300,
	//touchRatio: 0,
	//simulateTouch: false,
	loop: false,
	//preloadImages: false,
	lazy: true,
	// Dotts
	pagination: {
		el: ".pagination-team",
		draggable: true,
		type: 'bullets',
		clickable: true,
	},

	navigation: {
		nextEl: '.pagination-team__btn_next',
		prevEl: '.pagination-team__btn_prev',
	},

});

//--------------homepage-team-slider-------------------
