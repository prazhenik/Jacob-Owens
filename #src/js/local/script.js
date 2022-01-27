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
	}, 1000);

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
const subscribeIcon = document.querySelector(".subscribe__icon");
const socials = document.querySelector(".socials");
const iconsSocial = document.querySelectorAll(".socials a");

if (isMobile.any()) {
	subscribe.addEventListener("click", function (e) {
		subscribeIcon.classList.toggle("_active");
		setTimeout(function () {
			socials.classList.toggle("_show");
		}, 300);
	});
}

//закрытие при нажатии на оверлей
function socials_close() {
	socials.classList.remove("_show");
	subscribeIcon.classList.remove("_active");
}
document.addEventListener("click", function (e) {
	if (!e.target.closest('.subscribe__icon')) {
		socials_close(e.target.closest('.socials'));
	}
});

//------------------------------------textarea autosize----------------------------------------------------
autosize(document.querySelectorAll('textarea'));
