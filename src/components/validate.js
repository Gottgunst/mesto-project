export default class FormValidator {
  constructor(formElement, formsPrefs = {
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorFieldSelector: '[name="err-',}){
    this._formsPrefs = formsPrefs;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._formsPrefs.submitButtonSelector);

  }

  // Переключатель кнопки
  toggleButton() {
    const { submitButtonSelector, inactiveButtonClass, _formsPrefs, _formElement } = this;



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
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${this.errorFieldSelector}${evt.target.name}"]`);

    // проверка текущего поля согласно настройкам формы в HTML
    evt.target.validity.patternMismatch ?
    errField.textContent = evt.target.dataset.errorMessage :
      !evt.target.validity.valid ?
        errField.textContent = evt.target.validationMessage :
        errField.textContent = '';

    this.toggleButton(this._formsPrefs, this._formElement);
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
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${this.errorFieldSelector}${evt.target.name}"]`);

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
    return Array.from(this._formElement.querySelectorAll(`.${this.inputSelector}`)).some((el) => !el.validity.valid);
  }

  enableValidation(){
    const allForms = document.querySelectorAll(`.${this.formSelector}`);

    Array.from(allForms).forEach(form => {
      const inputFields = form.querySelectorAll(`.${this.inputSelector}`);

      Array.from(inputFields).forEach((field) => {
        field.addEventListener('input', (evt) => this._isValid(evt, this._formsPrefs, this._formElement));
        if(field.type === 'text'){
          field.addEventListener('keydown', (evt) => this._isKeyValid(evt, this._formsPrefs));
        }
    });
    });
  }
}
