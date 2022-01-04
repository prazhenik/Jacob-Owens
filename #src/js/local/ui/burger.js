//---------------------------- ▼ ▼ ▼ BURGER ▼ ▼ ▼ -------------------------------
let delay = 500;

let iconMenu = document.querySelector(".menu__icon");
let iconMenuClose = document.querySelector(".menu__icon-close");
let menuButton = document.querySelector(".menu__button");
let menuBody = document.querySelector(".menu__body");




function removeActiveMenu() {
	if (iconMenu.classList.contains('_active')) {
		document.body.classList.remove('_lock');
		iconMenu.classList.remove('_active');
		menuBody.classList.remove('_active');
		menuButton.classList.toggle("_active");
	}
}


//открываем и закрываем меню по клику на иконку бургера
if (menuButton != null) {
	delay = 500;
	//анимация при наведении на кнопку
	menuButton.addEventListener("mouseover", function (e) {
		if (iconMenu.classList.contains("_active")) {
			iconMenu.classList.remove("_hover");
		} else {
			iconMenu.classList.add("_hover");
		}
	});
	//анимация при уходе с кнопки
	menuButton.addEventListener("mouseout", function (e) {
		iconMenu.classList.remove("_hover");
	});


	//анимация при клике
	menuButton.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.remove("_hover");
			iconMenu.classList.toggle("_active");
			menuButton.classList.toggle("_active");
			iconMenuClose.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});

};



// плавная рокрутка и закрытие меню по клику
const menuLinks = document.querySelectorAll('.menu__link');
console.log(menuLinks.length);
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		setTimeout(removeActiveMenu, 500);
		removeActiveMenu();
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
			console.log(gotoBlockValue);
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
		
	}
}


// // на touch устройствах из functions.js открываем и закрываем subMenu
// if (isMobile.any()) {
// 	document.body.classList.contains('_touch');
// 	// слушаем клик по стрелке по которому показываем subMenu
// 	let menuArrows = document.querySelectorAll('.menu__arrow');
// 	if (menuArrows.length > 0) {
// 		for (let index = 0; index < menuArrows.length; index++) {
// 			const menuArrow = menuArrows[index];
// 			menuArrow.addEventListener("click", function (e) {
// 				menuArrow.parentElement.classList.toggle('_active');
// 			});
// 			// по клику по subMenu убираем все классы _active, чтобы скрыть все меню и снять lock со скролла body
// 			const menuSubLinks = document.querySelectorAll('.menu__sub-link');
// 			if (menuSubLinks.length > 0) {
// 				menuSubLinks.forEach(menuSubLink => {
// 					menuSubLink.addEventListener("click", onMenuSubLinkClick);
// 				});
// 				function onMenuSubLinkClick(e) {
// 					const menuSubLink = e.target;
// 					menuArrow.parentElement.classList.remove('_active');
// 					removeActiveMenu();
// 				}
// 			}
// 		}
// 	}
// }

//---------------------------- ▲ ▲ ▲ BURGER ▲ ▲ ▲ ------------------------------
