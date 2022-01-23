//------------------------------------------------------ ▼ ▼ ▼ FORMS ▼ ▼ ▼ -----------------------------------------------

//--------------------------------- Отправка формы ---------------------------------------

let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let popupSuccess = document.getElementById('popup_success');
let forms = document.querySelectorAll('.form');

if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}


async function form_submit(e) {
	e.preventDefault();
	let btn = e.target;
	let form = btn.closest('.form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : 'sendmail.php';//файл php куда сохраняется
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'POST';
		//const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			form_clean(form);
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				popupSuccess.classList.add("_active");
				form.reset();
				form_clean(form);
				//serviseMessage.classList.add("_active")
				if (message) {
					alert("Message sent successfully");
				}
			} else {
				alert("Message not sent");
				form.classList.remove('_sending');
			}
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}


function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}

//---------------------------------- валидация ИНПУТОВ ЗНАЧЕНИЙ -------------------------------

//-------------------возвращает первоначальные значения инпутов после отправки/неотправки формы
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.classList.contains("_email")) {
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (emailTest(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}

	} else if (input.getAttribute("name") == "phone" || input.classList.contains("_phone")) {
		function phoneTest(input) {
			return !/^\+[\d]{10,12}\d$/.test(input.value);
		}
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (phoneTest(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}

//-------------------проверка инпутов до отправки/неотправки формы
let inputsText = document.querySelectorAll('._text'); // проверка текстовых инпутов с классом _text
for (let i = 0; i < inputsText.length; i++) {
	const inputText = inputsText[i];
	inputText.oninput = function (textVal) {
		let regex = /[^0-9A-Za-zА-Яа-я -]/g;
		if (this.value.match(regex)) {
			this.value = this.value.replace(regex, '');
			form_add_error(inputText)

		} else {
			form_remove_error(inputText)
		}
	};
}

let inputsPhone = document.getElementsByClassName('_phone'); //проверка текстовых инпутов с классом _phone
for (let i = 0; i < inputsPhone.length; i++) {
	const inputPhone = inputsPhone[i];
	inputPhone.oninput = function (digiVal) {
		let regex = !/^\+[\d]{10,12}\d$/;
		if (this.value.match(regex)) {
			this.value = this.value.replace(regex, '');
			form_add_error(inputPhone)

		} else {
			form_remove_error(inputPhone)
		}
	};
}

function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.insertAdjacentHTML('beforebegin', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

//viewPass
let viewPass = document.querySelectorAll('._viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}



//-----------------------------маски для Placeholers--------------------------------------

let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					if (input.parentElement.querySelector('._viewpass')) {
						if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
							input.setAttribute('type', 'password');
						}
					} else {
						input.setAttribute('type', 'password');
					}
				}
				if (input.classList.contains('_date')) {
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						noremask: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);

				}

				// if (input.classList.contains('_phone')) {
				// 	input.classList.add('_mask');
				// 	Inputmask("{12,13}", {
				// 		//"placeholder": '123',
				// 		clearIncomplete: true,
				// 		clearComplete: true,
				// 		clearMaskOnLostFocus: true,
				// 		//noremask: true,
				// 		// onincomplete: function () {
				// 		// 	// input_clear_mask(input, input_g_value);
				// 		// 	// input_placeholderPhone_add(input);
				// 		// 	return originalPlaceholder;
				// 		// },
				// 		// oncomplete: function () {
				// 		// 	return originalPlaceholder;
				// 		// 	// input_clear_mask(input, input_g_value);
				// 		// 	// input_placeholderPhone_add(input);
				// 		// 	// input_placeholder_add(input)
				// 		// },
				// 		// onUnMask: function () {
				// 		// 	// input_clear_mask(input, input_g_value);
				// 		// 	// input_placeholderPhone_add(input);
				// 		// },
				// 	}).mask(input);
				// }

				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				input.classList.remove('_mask');
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
						input_placeholder_add(input)
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			// для работы календаря подключить вендор из libs/datepicker-full.min.js

			// ! доделать, чтобы после ручного ввода календарь переходил на дату

			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}

function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}

function input_placeholderPhone_add(input) {
	const input_phone_value = input.placeholder;
	console.log('input_phone_value');
	input.value = input_phone_value;
}

function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}



//------------------------------------------------------ ▲ ▲ ▲ FORMS ▲ ▲ ▲ -----------------------------------------------




