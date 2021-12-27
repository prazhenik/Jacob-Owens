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

function highlightCurrent() {
	const curPage = document.URL;
	const links = document.getElementsByTagName('a');
	for (let link of links) {
		if (link.href == curPage) {
			link.classList.add("_activepage");
		}
	}
}

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		highlightCurrent()
	}
};





//preloader
window.onload = function preloader() {
	document.body.classList.add('_loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.remove('_loaded_hiding');
	}, 500);
}



//------------------------------------опции товара----------------------------------------------------

const optionsColor = document.getElementById('options-color');
const optionsSize = document.getElementById('options-size');
const btn_submit = document.getElementById('btn-itempage');


function display() {
	var checkSize = document.querySelector('input[name="form[size]"]:checked');
	var checkColor = document.querySelector('input[name="form[color]"]:checked');
	if (checkSize !== null && checkColor !== null) {
		btn_submit.removeAttribute('disabled');
	}
}

function formCheck() {
	if (optionsColor != null || optionsSize != null) {
		optionsColor.addEventListener('input', (e) => {
			const currentColor = e.target;
			if (currentColor.checked) {
				display()
			}
		});
		optionsSize.addEventListener('input', (e) => {
			const currentSize = e.target;
			if (currentSize.checked) {
				display()
			}
		});
	}
}


formCheck()

//------------------------------------parallax----------------------------------------------------

var parallaxScene = document.getElementsByClassName("scene")

if (parallaxScene.length > 0) {
	var scene1 = document.getElementById('hero__img_secondary1');
	var parallaxInstance1 = new Parallax(scene1);

	var scene2 = document.getElementById('hero__img_secondary2');
	var parallaxInstance2 = new Parallax(scene2);
}


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


//--------------------------------text color effect----------------------------------
//subscribe link
// const text = document.querySelector("._popup-link");
// const strText = text.textContent;


// function animateTextColor() {
// 	const splitText = strText.split("");
// 	text.textContent = "";

// 	console.log(splitText);

// 	for (let i = 0; i < splitText.length; i++) {
// 		text.innerHTML += "<span>" + splitText[i] + "</span>";
// 	}

// 	let char = 0;
// 	let timer = setInterval(onTick, 50);

// 	function onTick() {
// 		const span = text.querySelectorAll('span')[char];
// 		span.classList.add('_mod');
// 		char++
// 		if (char === splitText.length) {
// 			complete();
// 			return;
// 		}
// 	}

// 	function complete() {
// 		clearInterval(timer);
// 		timer = null;
// 	}
// }




