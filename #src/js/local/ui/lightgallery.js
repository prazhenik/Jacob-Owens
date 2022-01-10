//-------------------------- ▼ ▼ ▼ GALLERY (lightgallery) ▼ ▼ ▼ ------------------

// let gallery = document.querySelectorAll('._gallery');
// if (gallery) {
// 	gallery_init();
// }
// function gallery_init() {
// 	for (let index = 0; index < gallery.length; index++) {
// 		const el = gallery[index];
// 		lightGallery(el, {
// 			counter: false,
// 			selector: 'a',
// 			download: false
// 		});
// 	}
// }

lightGallery(document.getElementById('lightgallery'), {
	thumbnail: true,
	download: false,
	selector: 'a',
	mobileSettings: {
		controls: false, download: false
	}
});


//---------------------------- ▲ ▲ ▲ GALLERY ▲ ▲ ▲ ------------------------------
