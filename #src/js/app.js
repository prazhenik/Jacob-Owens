// для подключения заменить // на @@


//подключение JS файлов из папки js/files/

@@include('local/functions.js', {}); //все касательно функций (1)
//include('local/sliders.js', {}); //все касательно слайдеров (2)

//все касательно форм
@@include('local/forms/forms.js', {}); // валидация/отправка форм и маски
//include('local/forms/quantity.js', {}); // подсчет количества чего-либо
//include('local/forms/range.js', {}); // ползунок диапазона цены
//include('local/forms/ratings.js', {}); // рейтинги звезды
//include('local/forms/select.js', {}); // селекты


//include('local/dynamic_adapt.js', {}); //все касательно динамического адаптива (4)
@@include('local/popups.js', {}); //все касательно попапов (5)
//include('local/regular.js', {}); //все регулярки
@@include('local/scroll.js', {}); //все касательно плавного скрола




//все касательно готовых модулей UI
@@include('local/ui/burger.js', {});
@@include('local/ui/lightgallery.js', {});
//include('local/ui/spollers.js', {});
//include('local/ui/tabs.js', {});


@@include('local/script.js', {}); // стили конкретного проекта


//include('local/map.js', {}); //все касательно карт 
