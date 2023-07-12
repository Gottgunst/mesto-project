import { Popup } from '.';

// #################
// POP-UP Submit Class
// #################

export class PopupAdvance extends Popup{
  constructor(popupSelector, request,
    labelArray = [
        'Обрабатываем',
        'Сохраняем',
        'Выполняем',
        'Исполняем',
        'Загружаем',
        'Обновляем',
      ],
    styleFormCfg = {
      submit: '.popup__submit',
      },
    ...args)
  {
    super(popupSelector, ...args);

    // слабое связывание
    this._request = request;

    // Расширяю настройки имен стилей
    this._style.submit = styleFormCfg.submit;

    // Массив label для кнопки submit
    this._labelArray = labelArray;

    // находим элементы
    this._submit = this._popupElement.querySelector(this._style.submit);

    // объявляем переменную для Id анимации — чтобы её остановить
    this._stopAnimation;

    // сохраняем начальный label у submit
    this._labelButton = this._submit.textContent;
  }

  // расширяем функционал
  setEventListeners(){
    // Привязываем контекст к слушателю события
    const bindSubmitForm = this._submitForm.bind(this);

    // добавлять обработчик сабмита формы.
    this._submit.form.addEventListener('submit', bindSubmitForm);
    super.setEventListeners();
  }

  // универсальный обработчик submit
  _submitForm(evt){
    evt.preventDefault();

    // запускаем анимацию загрузки и сохраняем в stop её id для остановки
    // передаём массив вариантов label, если он передан в конструктор
    this._stopAnimation = this._loadStatusButton( this._submit, this._labelArray);

    // запускаем реквест-функцию из конструктора и передаём нужные параметры
    this._runRequest(evt);
  }

  _runRequest(evt){
    this._request();
  }

  succeedSubmit(){
    const {_submit, _stopAnimation, _labelButton, _loadStatusButton} = this;
    this.closePopup();
    // останавливаем анимацию и возвращаем начальное имя
    _loadStatusButton(_submit, [_labelButton], _stopAnimation);
  }

  errSubmit(err){
    const {_submit, _stopAnimation, _labelButton, _loadStatusButton} = this;
    _loadStatusButton(_submit, [`Ошибка: ${err.status}`], _stopAnimation);
    // возвращаем начальное имя спустя пару секунд шока
    setTimeout(()=>_loadStatusButton(_submit, [_labelButton], _stopAnimation), 2000);
  }

  // Индикация обработки данных
  _loadStatusButton( submit, textArr , intervalId) {
    if(!intervalId){
      let flag = 0;
      // берём случайный label из массива
      const textId = Math.floor(Math.random() * textArr.length);
      // возвращаем ID для его отключения
      return setInterval(()=>{
          flag++;
          const dots = new Array(flag % 5).join('.');
          submit.textContent = textArr[textId] + dots;
        }, 400);
    } else {
      // останавливаем анимацию и возвращаем label
      clearInterval(intervalId);
      submit.textContent = textArr[0];
    }
  }
}
