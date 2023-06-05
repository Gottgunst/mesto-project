// ########################
// Установка слушателей
// ########################

window.currForm = {}; // ссылка на объект открытой формы

export function enableValidation(formObjects){
  window.currForm = formObjects;

  toggleButton();

  Array.from(window.currForm.form).forEach((item)=>{
    switch (item.type) {
      case 'text':
        item.addEventListener('input', isValid);
        item.addEventListener('keydown', isKeyValid);
        break;
      case 'url':
        item.addEventListener('input', isValid);
        break;
    }
  });
}

// ########################
// Валидация во время ввода
// ########################

function isValid (evt){
  // находим поле для вывода ошибки
  const errField = document.querySelector(`[name="err-${evt.target.name}"]`);

  // проверка текущего поля согласно настройкам формы в HTML
  evt.target.validity.patternMismatch ?
  errField.textContent = evt.target.dataset.errorMessage :
    !evt.target.validity.valid ?
      errField.textContent = evt.target.validationMessage :
      errField.textContent = '';

  // ########################
  // ДОП. ОПЦИИ Проверки буфера обмена
  // ########################
  // const printed = new RegExp(evt.target.pattern, 'g');

  // if (evt.target.value.replace(printed, "").length > 0){
  //   evt.target.setCustomValidity(evt.target.dataset.errorMessage);
  //   errField.textContent = evt.target.validationMessage;
  // } else {
  //   evt.target.setCustomValidity("");
  //   errField.textContent = '';
  // }

  // стираем лишние пробелы
  // if(evt.target.value.replace(/[\s]/g, '').length < 1){
  //   evt.target.value="";
  //   evt.target.setCustomValidity("Поле незаполнено");
  //   errField.textContent = evt.target.validationMessage;
  // } else {
  //   evt.target.value= evt.target.value.replace(/(\s)+/g, '$1');
  // }

  // запускаем переключатель для submit
  toggleButton();
}

// ########################
// ДОП. ОПЦИИ Проверка ввода символов
// ########################

function isKeyValid(evt) {
  // находим поле для вывода ошибки
  const errField = document.querySelector(`[name="err-${evt.target.name}"]`);

  errField.textContent = hasDoubleKey(evt, ' ') ?
    "Два пробела подряд" :
    // doubleKey(evt, '.') ? "Две точки подряд":
    hasDoubleKey(evt, '-') ? "Два дефиса подряд": "";

  const printed = new RegExp(evt.target.pattern, 'gi'); //[a-zа-яё\-\s]/gi;

  if (!printed.test(evt.key)){
    evt.preventDefault();
  }

  if(evt.key === 'Backspace'| evt.key === 'Delete'){
    errField.textContent = "";
  }
}

// ########################
// ДОП. ОПЦИИ Проверка на двойные символы
// ########################

function hasDoubleKey(evt, key){
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

function toggleButton() {
  const button = window.currForm.button;

  if (hasInvalidInput()){
    button.classList.add(window.currForm.inactiveButtonClass);
    button.setAttribute('disabled','disabled');
  } else {
    button.classList.remove(window.currForm.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

// ########################
// Проверка всех форм на невалидность
// ########################

function hasInvalidInput() {
  return Array.from(window.currForm.form).some((el) => !el.validity.valid);
};


// ########################
// Удаление слушателей
// ########################

export function disableValidation(){
  if(window.currForm.form){
    toggleButton();
    Array.from(window.currForm.form).forEach((item)=>{
      item.removeEventListener('input', isValid);
      item.removeEventListener('keydown', isKeyValid);
    });
  }

  // очищаем с задержкой, на всякий случай
  setTimeout(()=>window.currForm = {}, 50);
}
