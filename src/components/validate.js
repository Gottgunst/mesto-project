export default class FormValidator {
  constructor(formElement, formsPrefs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    errorFieldSelector: '[name="err-',}){
  this._formElement = formElement;
  this._formsPrefs = formsPrefs;

  }

  // Переключатель кнопки
  toggleButton() {
    const { inactiveButtonClass, _formsPrefs, _formElement } = this;
    const button = _formElement.querySelector(submitButtonSelector);


    if (this._hasInvalidInput(_formsPrefs, _formElement)){
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled','disabled');
    } else {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  // Валидация во время ввода
  _isValid (evt){
    const { errorFieldSelector, _formsPrefs, _formElement } = this;
    // находим поле для вывода ошибки
    const errField = document.querySelector(`.${errorFieldSelector}${evt.target.name}"]`);

    // проверка текущего поля согласно настройкам формы в HTML
    evt.target.validity.patternMismatch ?
    errField.textContent = evt.target.dataset.errorMessage :
      !evt.target.validity.valid ?
        errField.textContent = evt.target.validationMessage :
        errField.textContent = '';

    this.toggleButton(_formsPrefs, _formElement);
  }

  _hasDoubleKey(evt, key){
    if (evt.key === key && evt.key === evt.target.value[evt.target.value.length-1] ||
        evt.key === key && evt.key === evt.target.value[evt.target.value.length-2] ){
      evt.preventDefault();
      return true;
    }
    return false;
  }

  _isKeyValid(evt) {
    const { errorFieldSelector } = this;
    // находим поле для вывода ошибки
    const errField = document.querySelector(`.${errorFieldSelector}${evt.target.name}"]`);

    errField.textContent = this._hasDoubleKey(evt, ' ') ?
      "Два пробела подряд" :
      this._hasDoubleKey(evt, '-') ? "Два дефиса подряд": "";

    const printed = new RegExp(evt.target.pattern, 'gi'); //[a-zа-яё\-\s]/gi;

    if (!printed.test(evt.key)){
      evt.preventDefault();
    }

    if(evt.key === 'Backspace'| evt.key === 'Delete'){
      errField.textContent = "";
    }
  }

  _hasInvalidInput() {
    const { inputSelector, _formElement } = this;
    return Array.from(_formElement.querySelectorAll(inputSelector)).some((el) => !el.validity.valid);
  }

  enableValidation(){
    const { inputSelector, formSelector, _formsPrefs, _formElement } = this;
    const allForms = document.querySelectorAll(formSelector);

    Array.from(allForms).forEach(form => {
      const inputFields = form.querySelectorAll(inputSelector);

      Array.from(inputFields).forEach((field) => {
        field.addEventListener('input', (evt) => this._isValid(evt, _formsPrefs, _formElement));
        if(field.type === 'text'){
          field.addEventListener('keydown', (evt) => this._isKeyValid(evt, _formsPrefs));
        }
    });
    });
  }
}
