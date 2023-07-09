import { Popup } from '.';

// #################
// POP-UP Submit Class
// #################

export class PopupSubmit extends Popup{
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
    title: '.popup__title_type_del-card',
    wrapper: '.element__wrapper',
    activeLike: '.element__button-like_active',
    submit: '.popup__submit',
      },
    ...args)
  {
    super(popupSelector, ...args);

    // слабое связывание
    this._request = request;
    this._bindSubmitForm = this._submitForm.bind(this);

    // Расширяю настройки имен стилей
    this._style.title = styleFormCfg.title;
    this._style.wrapper = styleFormCfg.wrapper;
    this._style.activeLike = styleFormCfg.activeLike;
    this._style.submit = styleFormCfg.submit;

    // Массив label для кнопки submit
    this._labelArray = labelArray;

    // находим элементы
    this._titleEl = this._popupElement.querySelector(this._style.title);
    this._submit = this._popupElement.querySelector(this._style.submit);

    // объявляем переменную для Id анимации — чтобы её остановить
    this._stopAnimation;

    // сохраняем начальный label у submit
    this._labelButton = this._submit.textContent;

  }

  // расширяем функционал
  setEventListeners(){
    // добавлять обработчик сабмита формы.
    this._submit.form.addEventListener('submit', this._bindSubmitForm );
    super.setEventListeners();
  }

  // универсальный обработчик submit
  _submitForm(evt){
    evt.preventDefault();

    // запускаем анимацию загрузки и сохраняем в stop её id для остановки
    // передаём массив вариантов label, если он передан в конструктор
    this._stopAnimation = this._loadStatusButton( this._submit, this._labelArray);

    // запускаем реквест-функцию из конструктора и передаём нужные параметры
    this._request(evt);
  }

  // Универсальный сборщик полей формы
  _getInputValues(){
    return Object
      .values(this._submit.form)
      .filter(el => el.type !== "submit")
      .reduce((obj, el) =>
        Object.assign(obj, { [el.name]: el.value }), {});
  }

  _succeedSubmit(){
    const {_submit, _stopAnimation, _labelButton, _loadStatusButton} = this;
    this.closePopup();
    // останавливаем анимацию и возвращаем начальное имя
    _loadStatusButton(_submit, [_labelButton], _stopAnimation);
  }

  _errSubmit(err){
    const {_submit, _stopAnimation, _labelButton, _loadStatusButton} = this;
    _loadStatusButton( [`Ошибка: ${err.status}`], _stopAnimation);
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
