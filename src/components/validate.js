export default class FormValidator {
  constructor(
    formSelector,
    formsPrefs = {
      formSelector: "popup__form",
      inputSelector: "popup__field",
      submitButtonSelector: "popup__submit",
      inactiveButtonClass: "popup__submit_disabled",
      errorFieldSelector: '[name="err-', // ${evt.target.name}"]
      // inputErrorClass: 'popup__field-error',
      // errorClass: 'popup__error',
    }
  ) {
    this._formElement = document.querySelector(formSelector);
    this._formsPrefs = formsPrefs;
    this._button = this._formElement.querySelector(".popup__submit");
  }

  toggleButton() {
    const { _formsPrefs, _formElement } = this;
    const { inactiveButtonClass } = _formsPrefs;

    if (this._hasInvalidInput()) {
      this._button.classList.add(inactiveButtonClass);
      this._button.setAttribute("disabled", "disabled");
    } else {
      this._button.classList.remove(inactiveButtonClass);
      this._button.removeAttribute("disabled");
    }
  }
  // Валидация во время ввода
  _isValid(evt) {
    const { _formElement } = this;
    const { errorFieldSelector } = this._formsPrefs;
    // находим поле для вывода ошибки
    const errField = this._formElement.querySelector(
      `${errorFieldSelector}${evt.target.name}"]`
    );

    // проверка текущего поля согласно настройкам формы в HTML
    evt.target.validity.patternMismatch
      ? (errField.textContent = evt.target.dataset.errorMessage)
      : !evt.target.validity.valid
      ? (errField.textContent = evt.target.validationMessage)
      : (errField.textContent = "");

    this.toggleButton();
  }

  _hasDoubleKey(evt, key) {
    if (
      (evt.key === key &&
        evt.key === evt.target.value[evt.target.value.length - 1]) ||
      (evt.key === key &&
        evt.key === evt.target.value[evt.target.value.length - 2])
    ) {
      evt.preventDefault();
      return true;
    }
    return false;
  }

  _isKeyValid(evt) {
    const { errorFieldSelector } = this._formsPrefs;
    // находим поле для вывода ошибки
    const errField = this._formElement.querySelector(
      `${errorFieldSelector}${evt.target.name}"]`
    );

    errField.textContent = this._hasDoubleKey(evt, " ")
      ? "Два пробела подряд"
      : this._hasDoubleKey(evt, "-")
      ? "Два дефиса подряд"
      : "";

    const printed = new RegExp(evt.target.pattern, "gi"); //[a-zа-яё\-\s]/gi;

    if (!printed.test(evt.key)) {
      evt.preventDefault();
    }

    if ((evt.key === "Backspace") | (evt.key === "Delete")) {
      errField.textContent = "";
    }
  }

  _hasInvalidInput() {
    const { _formElement } = this;
    const { inputSelector } = this._formsPrefs;
    return Array.from(_formElement.querySelectorAll(`.${inputSelector}`)).some(
      (el) => !el.validity.valid
    );
  }

  enableValidation() {
    const { _formElement } = this;
    const { inputSelector } = this._formsPrefs;

    const inputFields = _formElement.querySelectorAll(`.${inputSelector}`);
    Array.from(inputFields).forEach((field) => {
      field.addEventListener("input", (evt) =>
        this._isValid(evt)
      );
      if (field.type === "text") {
        field.addEventListener("keydown", (evt) =>
          this._isKeyValid(evt)
        );
      }
    });
  }
}

