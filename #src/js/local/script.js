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
window.onload = function preloader() {
	document.body.classList.add('_loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.remove('_loaded_hiding');
	}, 1000);
}



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
const socials = document.querySelector(".socials");

console.log(subscribe);

subscribe.addEventListener("click", function (e) {
	socials.classList.toggle("_active");
});
