//плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]');

if (smoothLinks) {
	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			e.preventDefault();
			const id = smoothLink.getAttribute('href');

			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};
}


//класс ссылке активной страници

// function highlightCurrent() {
// 	const curPage = document.URL;
// 	const links = document.getElementsByTagName('a');
// 	for (let link of links) {
// 		if (link.href == curPage) {
// 			link.classList.add("_activepage");
// 		}
// 	}
// }

// document.onreadystatechange = () => {
// 	if (document.readyState === 'complete') {
// 		highlightCurrent()
// 	}
// };





//preloader
window.onload = function () {
	let preloader = document.getElementById('preloader');
	preloader.classList.add('_hide-preloader');
	body_lock_add();
	setInterval(function () {
		preloader.classList.add('_preloader-hidden');
		preloader.classList.remove('_hide-preloader');
		body_lock_remove();
	}, 1500);
}


var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
	use_native: true
});


//------------------------------------parallax----------------------------------------------------

var parallaxScene = document.getElementsByClassName("scene")

if (parallaxScene.length > 0) {
	var scene1 = document.getElementById('hero__img_secondary1');
	var parallaxInstance1 = new Parallax(scene1);

	var scene2 = document.getElementById('hero__img_secondary2');
	var parallaxInstance2 = new Parallax(scene2);
}

//------------------------------------parallax----------------------------------------------------

//------------------------------------total count----------------------------------------------------

const itemsPrice = document.getElementsByClassName("item-price__price");
const itemsQuantity = document.getElementsByClassName("item-quantity__input");
const itemsPriceTotal = document.getElementsByClassName("item-price-total__price");



if (itemsPrice) {
	for (var i = 0; i < itemsPrice.length; i++) {
		itemPrice = itemsPrice[i].innerText;
	}
	for (var i = 0; i < itemsQuantity.length; i++) {
		itemQuantity = itemsQuantity[i].value;
	}
}

//------------------------------------total count----------------------------------------------------











//------------------------------------subscribe submenu----------------------------------------------------

const subscribe = document.querySelector(".subscribe");
const subscribeText = document.querySelector(".subscribe__text");
const subscribeIcon = document.querySelector(".subscribe__icon");
const socials = document.querySelector(".socials");
const iconsSocial = document.querySelectorAll(".socials a");



if (iconsSocial.length > 0) {
	iconsSocial.forEach(iconSocial => {
		//скрытие панели при переходе
		iconSocial.addEventListener("click", function (e) {
			socials.classList.remove("_show");
		});
		if (!isMobile.any()) {
			iconSocial.addEventListener("mouseover", function (e) {
				if (iconSocial.classList.contains("_active_PC")) {
					iconSocial.classList.remove("_active_PC");
				} else {
					iconSocial.classList.add("_active_PC");
				}
			});
			//анимация при уходе с кнопки
			iconSocial.addEventListener("mouseout", function (e) {
				iconSocial.classList.remove("_active_PC");
			});
			subscribe.addEventListener("mouseover", function (e) {
				socials.classList.add("_show");
				subscribeText.classList.add("_hide");
			});

			subscribe.addEventListener("mouseout", function (e) {
				socials.classList.remove("_show");
				subscribeText.classList.remove("_hide");
			});
		}
	});
}




subscribeIcon.addEventListener("click", function (e) {
	socials.classList.toggle("_show");
});


//закрытие при нажатии на оверлей
function socials_close() {
	socials.classList.remove("_show");
}
document.addEventListener("click", function (e) {
	if (!e.target.closest('.subscribe__icon')) {
		socials_close(e.target.closest('.socials'));
	}
});






//------------------------------------textarea autosize----------------------------------------------------
autosize(document.querySelectorAll('textarea'));
