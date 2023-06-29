export default class FormValidator {
  constructor(formsPrefs, formElement){
    this._formsPrefs = formsPrefs;
    this._formElement = formElement;
  }

  toggleButton() {
    const {_formsPrefs, _formElement} = this
    const {submitButtonSelector, inactiveButtonClass} = _formsPrefs
    const button = _formElement.querySelector(`.${submitButtonSelector}`);

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
    const {_formsPrefs, _formElement} = this
    const {errorFieldSelector} = _formsPrefs
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${errorFieldSelector}${evt.target.name}"]`);

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
    const {_formsPrefs} = this
    const {errorFieldSelector} = _formsPrefs
    // находим поле для вывода ошибки
    const errField = document.querySelector(`${errorFieldSelector}${evt.target.name}"]`);

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
    const {_formsPrefs, _formElement} = this
    const {inputSelector} = _formsPrefs
    return Array.from(_formElement.querySelectorAll(`.${inputSelector}`)).some((el) => !el.validity.valid);
  }

  enableValidation(){
    const {_formsPrefs, _formElement} = this
    const {formSelector, inputSelector} = _formsPrefs

    const allForms = document.querySelectorAll(`.${formSelector}`);

    Array.from(allForms).forEach(form => {
      const inputFields = form.querySelectorAll(`.${inputSelector}`);

      Array.from(inputFields).forEach((field) => {
        field.addEventListener('input', (evt) => this._isValid(evt, _formsPrefs, _formElement));
        if(field.type === 'text'){
          field.addEventListener('keydown', (evt) => this._isKeyValid(evt, _formsPrefs));
        }
    });
    });

  }

}

