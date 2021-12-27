
//-------------▼ ▼ ▼ ПЕРЕМЕННЫЕ ПОДКЛЮЧЕННЫХ ПЛАГИНОВ ▼ ▼ ▼--------------

//let replace = require('gulp-replace'); //.pipe(replace('bar', 'foo'))
let { src, dest } = require("gulp");
let fs = require('fs');//переменная для подключения шрифтов в scss
let gulp = require("gulp");
let browsersync = require("browser-sync").create(); //плагин обновления страницы в браузере
let autoprefixer = require("gulp-autoprefixer"); // добавляет вендорные префиксы к свойствам css
let scss = require('gulp-sass')(require('sass')); //плагин обработки scss в css для продакшн
let group_media = require("gulp-group-css-media-queries"); //группирует все медиазапросы и помещает в конец сводного файла
let plumber = require("gulp-plumber");
let del = require("del"); //плагин удаляет папку продакшна перед записью новых файлов 
let imagemin = import("gulp-imagemin"); // плагин минимизации и оптимизации изображений
let uglify = require("gulp-uglify-es").default; //плагин для сжатия и оптимизации JS файлов
let rename = require("gulp-rename"); //плагин для создания второго не сжатого файла css в продакшене 
let fileinclude = require("gulp-file-include"); //плагин сборки html файлов проекта в index.html
let clean_css = require("gulp-clean-css"); //чистит и сжимает css файл на выходе
let newer = require('gulp-newer');

let version = require('gulp-version-number');

let webp = require('imagemin-webp');//плагин переводит в формат webp
let webpcss = require("gulp-webp-css");//плагин подключения картинок webp в css
let webphtml = require('gulp-webp-html');//плагин подключения картинок webp в html

let fonter = require('gulp-fonter');//плагин преобразования в otf в ttf

let ttf2woff = require('gulp-ttf2woff');//плагин подключения шрифтов после преобразования ttf в woff
let ttf2woff2 = require('gulp-ttf2woff2');//плагин подключения шрифтов после преобразования ttf в woff2

//-------------▲ ▲ ▲ ПЕРЕМЕННЫЕ ПОДКЛЮЧЕННЫХ ПЛАГИНОВ ▲ ▲ ▲--------------


//-------------▼ ▼ ▼ ПУТИ ПО ДЕРЕВУ ПРОЕКТА ▼ ▼ ▼--------------

let project_name = require("path").basename(__dirname);
let src_folder = "#src";

let path = {
	/*пути к папкам продакшена*/
	build: {
		html: "build/" + project_name + "/",
		js: "build/" + project_name + "/js/",
		css: "build/" + project_name + "/css/",
		images: "build/" + project_name + "/img/",
		fonts: "build/" + project_name + "/fonts/",
		json: "build/" + project_name + "/json/"
	},
	/*пути к папкам исходников*/
	src: {
		favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
		html: [src_folder + "/**/*.html", "!" + src_folder + "/_*.html"],
		js: [src_folder + "/js/app.js", src_folder + "/js/vendors.js"],
		css: src_folder + "/scss/style.scss",
		images: [src_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}", "!**/favicon.*"],
		fonts: src_folder + "/fonts/*.ttf",
		json: src_folder + "/json/**/*.*"
	},
	/*пути к папкам наблюдения изменений содержимого*/
	watch: {
		html: src_folder + "/**/*.html",
		js: src_folder + "/**/*.js",
		css: src_folder + "/scss/**/*.scss",
		images: src_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
		json: src_folder + "/json/**/*.*"
	},
	clean: "./" + project_name + "/" //удаление папки продакшн перед записью обновленного содержимого
};


//-------------▲ ▲ ▲ ПУТИ ПО ДЕРЕВУ ПРОЕКТА ▲ ▲ ▲--------------


// Пишем папки которые нужно копировать через запятую
let foldersArray = ['videos']; // 'videos', 'files' ...
function copyFolders() {
	foldersArray.forEach(folderItem => {
		src(src_folder + "/" + folderItem + "/**/*.*", {})
			.pipe(newer("build/" + project_name + "/" + folderItem + "/"))
			.pipe(dest("build/" + project_name + "/" + folderItem + "/"));
	});
	return src(path.src.html).pipe(browsersync.stream());
}

//-------------- browserSync плагин обновления страницы в браузере----------------
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./build/" + project_name + "/" //базовая папка
		},
		notify: false, //скрывает отображение информационных сообщений
		port: 3000, //порт открытия браузера
	});
}

//-------------▼ ▼ ▼ СОЗДАНИЕ ПАПОК ПРОДАКШН ДЛЯ КАЖДОГО ТИПА ФАЙЛОВ ▼ ▼ ▼--------------

//-------------- создание html в папке продакшна ----------------
function html() {
	return src(path.src.html, {})
		.pipe(fileinclude())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

//--------------создание css в папке продакшна  ----------------
function css() {
	return src(path.src.css, {})
		//выгрузка не сжатого css
		.pipe(
			scss({ outputStyle: 'expanded' }).on('error', scss.logError)
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		//выгрузка минифицированного css
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

//-------------- создание json в папке продакшна ----------------
function json() {
	return src(path.src.json, {})
		.pipe(dest(path.build.json))
		.pipe(browsersync.stream());
}

//-------------- создание js в папке продакшна ----------------
function js() {
	return src(path.src.js, {})
		.pipe(fileinclude())
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

//-------------- создание images в папке продакшна ----------------
function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(dest(path.build.images))
}

//-------------- создание favicon в папке продакшна ----------------
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.html))
}

//-------------- создание fonts в папке продакшна ----------------
function fonts_otf() {
	return src('./' + src_folder + '/fonts/*.otf')
		.pipe(plumber())
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./' + src_folder + '/fonts/'));
}

//--------------  ----------------
function fonts() {
	src(path.src.fonts)
		.pipe(plumber())
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}

//-------------▲ ▲ ▲ СОЗДАНИЕ ПАПОК ПРОДАКШН ДЛЯ КАЖДОГО ТИПА ФАЙЛОВ ▲ ▲ ▲--------------

//-------------- функция для подключения шрифтов в scss ----------------
function fontstyle() {
	let file_content = fs.readFileSync(src_folder + '/scss/local/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/local/fonts.scss', '', cb);
		fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/local/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
						fs.appendFile(src_folder + '/scss/local/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "700", "Bold");\r\n', cb);
						fs.appendFile(src_folder + '/scss/local/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "900", "Black");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	return src(path.src.html).pipe(browsersync.stream());
}

//-------------  ------------------
function infofile() { }

//-------------вызов JS-функции записи информации в fonts.scss------------------
function cb() { }

//------------удаление папки продакшна в перед ее перезаписью при изменении содержимого----------------
function clean() {
	return del(path.clean);
}

//-------------- ▼ ▼ ▼ ФУНКЦИЯ ОТСЛЕЖИВАНИЯ ИЗМЕНЕНИЙ СОДЕРЖИМОГО ▼ ▼ ▼----------------

function watchFiles() {
	gulp.watch([path.watch.html], { usePolling: true }, html);
	gulp.watch([path.watch.css], { usePolling: true }, css);
	gulp.watch([path.watch.js], { usePolling: true }, js);
	gulp.watch([path.watch.json], { usePolling: true }, json);
	gulp.watch([path.watch.images], { usePolling: true }, images);
}

//-------------▲ ▲ ▲ ФУНКЦИЯ ОТСЛЕЖИВАНИЯ ИЗМЕНЕНИЙ СОДЕРЖИМОГО ▲ ▲ ▲--------------

//-------------- ▼ ▼ ▼ ФУНКЦИЯ  ▼ ▼ ▼----------------

function cssBuild() {
	return src(path.src.css, {})
		.pipe(plumber())
		.pipe(
			scss({ outputStyle: 'expanded' }).on('error', scss.logError)
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 5 versions"],
				cascade: true //стиль написания автопрефиксов
			})
		)
		.pipe(webpcss(
			{
				webpClass: "._webp",
				noWebpClass: "._no-webp"
			}
		))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

//-------------▲ ▲ ▲ ФУНКЦИЯ  ▲ ▲ ▲--------------

//-------------- ▼ ▼ ▼ ФУНКЦИЯ  ▼ ▼ ▼----------------

function jsBuild() {
	let appPath = path.build.js + 'app.min.js';
	let vendorsPath = path.build.js + 'vendors.min.js';
	del(appPath);
	del(vendorsPath);
	return src(path.src.js, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.js))
		.pipe(uglify(/* options */))
		.on('error', function (err) { console.log(err.toString()); this.emit('end'); })
		.pipe(
			rename({
				suffix: ".min",
				extname: ".js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

//-------------▲ ▲ ▲ ФУНКЦИЯ  ▲ ▲ ▲--------------

//-------------- ▼ ▼ ▼ ФУНКЦИЯ  ▼ ▼ ▼----------------

function imagesBuild() {
	return src(path.src.images)
		//.pipe(newer(path.build.images))
		.pipe(
			imagemin([
				webp({
					quality: 85
				})
			])
		)
		.pipe(
			rename({
				extname: ".webp"
			})
		)
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		//.pipe(newer(path.build.images))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3 // 0 to 7
			})
		)
		.pipe(dest(path.build.images))
}

//-------------▲ ▲ ▲ ФУНКЦИЯ  ▲ ▲ ▲--------------

//-------------- ▼ ▼ ▼ ФУНКЦИЯ  ▼ ▼ ▼----------------

function htmlBuild() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(version({
			'value': '%DT%',
			'replaces': [
				'#{VERSION_REPlACE}#',
				[/#{VERSION_REPlACE}#/g, '%TS%']
			],
			'append': {
				'key': '_v',
				'cover': 0,
				'to': [
					'css',
					['image', '%TS%'],
					{
						'type': 'js',
						'attr': ['src', 'custom-src'], // String or Array, undefined this will use default. css: "href", js: ...
						'key': '_v',
						'value': '%DT%',
						'cover': 1,
						'files': ['app.min.js', 'vendors.min.js'] // Array [{String|Regex}] of explicit files to append to
					}
				]
			},
			'output': {
				'file': 'version.json'
			}
		}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

//-------------▲ ▲ ▲ ФУНКЦИЯ  ▲ ▲ ▲--------------

//-------------- ▼ ▼ ▼ ПЕРЕМЕННЫЕ ДЛЯ ВЫЗОВА ФУНКЦИЙ СБОРКИ ▼ ▼ ▼----------------

let fontsBuild = gulp.series(fonts_otf, fonts, fontstyle);
let buildDev = gulp.series(clean, gulp.parallel(fontsBuild, copyFolders, json, html, css, js, favicon, images));
let watch = gulp.series(buildDev, gulp.parallel(watchFiles, browserSync)); //сценарий запуска обновления страницы и отслеживания изменений содержимого
let build = gulp.parallel(htmlBuild, cssBuild, jsBuild, imagesBuild);

//-------------▲ ▲ ▲ ПЕРЕМЕННЫЕ ДЛЯ ВЫЗОВА ФУНКЦИЙ СБОРКИ  ▲ ▲ ▲--------------

//--------------служебные переменные для запуска функций----------------
exports.copy = copyFolders;
exports.fonts = fontsBuild;
exports.build = build;
exports.watch = watch;//выполняется при запуске Галп и далее запускает плагин browserSync
exports.default = watch;//выполняется при запуске Галп и далее запускает плагин browserSync
