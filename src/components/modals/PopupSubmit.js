import { PopupAdvance } from '.';

// #################
// POP-UP Submit Class
// #################

export class PopupSubmit extends PopupAdvance{

  // переопределяем реквест-функцию
  _runRequest(evt){
    // запускаем и передаём нужные параметры
    this._request(evt, this._getInputValues());
  }

  // Универсальный сборщик полей формы
  _getInputValues(){
    return Object
      .values(this._submit.form)
      .filter(el => el.type !== "submit")
      .reduce((obj, el) =>
        Object.assign(obj, { [el.name]: el.value }), {});
  }
}
