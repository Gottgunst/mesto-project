// ########################
// Установка слушателей
// ########################

export function enableValidation(formObjects){

  Object.keys(formObjects).forEach((key) => {
    switch (formObjects[key].type) {
      case 'text':
        formObjects[key].addEventListener('input', isValid.bind(null, formObjects));
        formObjects[key].addEventListener('keydown', isKeyValid);
        formObjects[key].addEventListener('change', isFieldValid.bind(null, formObjects));
        break;
      case 'url':
        formObjects[key].addEventListener('input', isValid.bind(null, formObjects));
        break;
      case 'submit':
        // formObjects[key].addEventListener('submit', disableValidation.bind(null, formObjects));
        break;
    }
  });
}

// ########################
// Валидация во время ввода
// ########################

function isValid (formObjects, evt){
  const inputsValid=[];
  let submitButton = {};

  // находим поле для вывода ошибки
  const errField =
    evt.target.nextElementSibling.hasAttribute(`[name="err-${evt.target.name}"]`) ?
    evt.target.nextElementSibling :
    evt.target.parentElement.querySelector(`[name="err-${evt.target.name}"]`);

  // проверка текущего поля
  evt.target.validity.patternMismatch ? errField.textContent = evt.target.dataset.errorMessage:
    !evt.target.validity.valid ? errField.textContent = evt.target.validationMessage :
      errField.textContent = '';

  // проверка всех полей формы и обнаружение кнопки
  Object.keys(formObjects).forEach((key) => {
    if(formObjects[key].type !== 'submit'){
      inputsValid.push(formObjects[key].validity.valid);
    } else {
      submitButton=formObjects[key];
    }
  });

  // запускаем переключатель для submit
  toggleButton(submitButton, !inputsValid.some(valid => valid === false));
}

// ########################
// Валидация после ввода
// ########################

function isFieldValid (formObjects, evt){
  const inputsValid=[];
  let submitButton = {};
  const printed = new RegExp(evt.target.pattern, 'g'); ///[a-zа-яё\-\s]/gi;

  // находим поле для вывода ошибки
  const errField =
    evt.target.nextElementSibling.hasAttribute(`[name="err-${evt.target.name}"]`) ?
    evt.target.nextElementSibling :
    evt.target.parentElement.querySelector(`[name="err-${evt.target.name}"]`);

  // проверка текущего поля
  if (evt.target.value.replace(printed, "").length > 0){
    evt.target.setCustomValidity(evt.target.dataset.errorMessage);
    errField.textContent = evt.target.validationMessage;
    evt.target.focus();
  } else {
    evt.target.setCustomValidity("");
    errField.textContent = '';
  }

  // стираем лишние пробелы
  if(evt.target.value.replace(/[\s]/g, '').length < 1){
    evt.target.value="";
    evt.target.setCustomValidity("Поле незаполнено");
    errField.textContent = evt.target.validationMessage;
  } else {
    evt.target.value= evt.target.value.replace(/(\s)+/g, '$1');
  }

  // проверка всех полей формы и обнаружение кнопки
  Object.keys(formObjects).forEach((key) => {
    if(formObjects[key].type !== 'submit'){
      inputsValid.push(formObjects[key].validity.valid);
    } else {
      submitButton=formObjects[key];
    }
  });

  // запускаем переключатель для submit
  toggleButton(submitButton, !inputsValid.some(valid => valid === false));
}

// ########################
// Проверка ввода символов
// ########################

function isKeyValid(evt) {
  // находим поле для вывода ошибки
  const errField = evt.target.nextElementSibling; //evt.target.parentElement.querySelector(`[name="err-${evt.target.name}"]`);

  errField.textContent = doubleKey(evt, ' ') ? "Два пробела подряд" :
    // doubleKey(evt, '.') ? "Две точки подряд":
    doubleKey(evt, '-') ? "Два дефиса подряд": "";

  const printed = new RegExp(evt.target.pattern, 'gi'); //[a-zа-яё\-\s]/gi;


  if (!printed.test(evt.key)){
    evt.preventDefault();
  }

  if(evt.key === 'Backspace'| evt.key === 'Delete'){
    errField.textContent = "";
  }
}

// ########################
// Проверка на двойные символы
// ########################

function doubleKey(evt, key){
  if (evt.key === key && evt.key === evt.target.value[evt.target.value.length-1] ||
      evt.key === key && evt.key === evt.target.value[evt.target.value.length-2] ){
    evt.preventDefault();
    return true;
  }
  return false;
}

// ########################
// Переключатель кнопки
// ########################

function toggleButton(buttonObject, allFieldsValid) {
  if (allFieldsValid){
    buttonObject.classList.remove('popup__submit_disabled');
    buttonObject.removeAttribute('disabled');
  } else {
    buttonObject.classList.add('popup__submit_disabled');
    buttonObject.setAttribute('disabled','disabled');
  }
}

// ########################
// Удаление слушателей
// ########################

export function disableValidation(formObjects){

  Object.keys(formObjects).forEach((key) => {
    switch (formObjects[key].type) {
      case 'text':
        formObjects[key].removeEventListener('input', isValid.bind(null, formObjects));
        formObjects[key].removeEventListener('keydown', isKeyValid);
        formObjects[key].removeEventListener('change', isFieldValid.bind(null, formObjects));
        break;
      case 'url':
        formObjects[key].removeEventListener('input', isValid.bind(null, formObjects));
        break;
      case 'submit':
        // formObjects[key].removeEventListener('submit', disableValidation.bind(null, formObjects));
        break;
    }
  });
}


