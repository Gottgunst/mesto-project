// ########################
// Установка слушателей
// ########################

export default function validate(formObjects){

  Object.keys(formObjects).forEach((key) => {
    if(formObjects[key].type !== 'submit'){
      formObjects[key].addEventListener('input', isValid.bind(null, formObjects));
      formObjects[key].addEventListener('keydown', isSpaceKey);
    } else {
      formObjects[key].addEventListener('submit', removeListener.bind(null, formObjects));
    }
  });
}

// ########################
// Валидация формы
// ########################

function isValid (formObjects, evt){
  const inputsValid=[];
  let submitButton = {};

  // находим поле для вывода ошибки
  const errField = evt.target.nextElementSibling; //evt.target.parentElement.querySelector(`[name="err-${evt.target.name}"]`);

  // проверка текущего поля
  evt.target.validity.valid ? errField.textContent = '' : errField.textContent = evt.target.validationMessage;

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
// Проверка на двойные пробелы
// ########################

function isSpaceKey(evt) {
  // находим поле для вывода ошибки
  const errField = evt.target.nextElementSibling; //evt.target.parentElement.querySelector(`[name="err-${evt.target.name}"]`);
  if (evt.key === ' ' && evt.key === evt.target.value[evt.target.value.length-1]){
    evt.preventDefault();
    errField.textContent = "Два пробела подряд";
  } else {
    errField.textContent = "";
  }

  // если вставить пробелы из буфера обмена?
  // if (evt.code === "KeyV"){
  //   checkPastSpace(evt);
  // }
}


// function checkPastSpace(evt) {
//   if(evt.target.value.replace(/\s/g, '').length < 1){
//     evt.preventDefault();
//     evt.target.value="";
//   }
// }


// ########################
// Удаление слушателей
// ########################

function removeListener(formObjects){
  Object.keys(formObjects).forEach((key) => {
    if(formObjects[key].type !== 'submit'){
      formObjects[key].removeEventListener('input', isValid);
      formObjects[key].removeEventListener('keydown', isSpaceKey);
    } else {
      formObjects[key].removeEventListener('submit', removeListener);
    }
  });
}


