//-------------------------- ▼ ▼ ▼ GALLERY (lightgallery) ▼ ▼ ▼ ------------------

let gallery = document.querySelectorAll('._gallery');
let lgOn = document.querySelectorAll('.gallery__item_title');


if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			thumbnail: true,
			download: false,
			selector: 'a',
			zoomFromOrigin: true,
			mobileSettings: {
				controls: false, download: false, zoomFromOrigin: true
			}
		});
	}
}




// for (let index = 0; index < lgOn.length; index++) {
// 	const open = lgOn[index];
// 	console.log(open);
// 	open.addEventListener("click", function (e) {
// 		gallery_init();
// 	});
// }




//---------------------------- ▲ ▲ ▲ GALLERY ▲ ▲ ▲ ------------------------------
