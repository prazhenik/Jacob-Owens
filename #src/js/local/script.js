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
	let body = document.querySelector("body");
	let preloader = document.getElementById('preloader');
	body.classList.add("_preloader")
	//body_lock_add();
	preloader.classList.add('_hide-preloader');
	setInterval(function () {
		preloader.classList.add('_preloader-hidden');
		preloader.classList.remove('_hide-preloader');
		body.classList.remove("_preloader")
		//body_lock_remove();
	}, 1500);

}


var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
	use_native: true
});


//------------------------------------parallax----------------------------------------------------

// var parallaxScene = document.getElementsByClassName("scene")

// if (parallaxScene.length > 0) {
// 	var scene1 = document.getElementById('');
// 	var parallaxInstance1 = new Parallax(scene1);

// 	var scene2 = document.getElementById('');
// 	var parallaxInstance2 = new Parallax(scene2);
// }

//------------------------------------parallax----------------------------------------------------





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



//открытие соцсетей и закрытие при нажатии на оверлей
subscribeIcon.addEventListener("click", function (e) {
	socials.classList.toggle("_show");
});

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
