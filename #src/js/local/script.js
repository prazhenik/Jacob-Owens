//плавный скролл
const smoothLinks = document.querySelectorAll('a[href^="#"]:not(._popup-link)');
const activePopup = document.querySelectorAll('.popup._active');



if (smoothLinks.length > 0) {
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
<<<<<<< HEAD
const socials = document.querySelector(".subscribe__socials");
=======
const socials = document.querySelector(".socials");
>>>>>>> 3c7f97b4e944f3cbb0f4a2a685eb07102bae8742
const overlay = document.querySelector("._overlay");

if (isMobile.any()) {
	subscribe.addEventListener("click", function (e) {
		if (!subscribeIcon.classList.contains("_active") && !socials.classList.contains("_show")) {
			subscribeIcon.classList.add("_active");
			overlay.classList.add("_active");
			body_lock_add();
			setTimeout(function () {
				socials.classList.add("_show")
			}, 300);
		} else {
			socials_close()
		}
	});
	document.addEventListener("click", function (e) {
<<<<<<< HEAD
		if (!e.target.closest('.subscribe__icon')) {
			socials_close(e.target.closest('.subscribe__socials'));
=======
		console.log(e);
		if (!e.target.closest('.subscribe__icon')) {
			socials_close(e.target.closest('.socials'));
>>>>>>> 3c7f97b4e944f3cbb0f4a2a685eb07102bae8742
		}
	});
}

//закрытие при нажатии на оверлей
function socials_close() {
	setTimeout(function () {
		body_lock_remove();
	}, 300);
	socials.classList.remove("_show");
	subscribeIcon.classList.remove("_active");
	overlay.classList.remove("_active");
}



//------------------------------------textarea autosize----------------------------------------------------
autosize(document.querySelectorAll('textarea'));

if (!isMobile.any()) {
	VanillaTilt.init(document.querySelectorAll(".btn"), {
		max: 15,
		speed: 300,
		glare: true
	});
}
