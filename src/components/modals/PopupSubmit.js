import { Popup } from './Popup';


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
    this._bindGetInputValues = this._getInputValues.bind(this);

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

    // this.setEventListeners();
  }

  // расширяем функционал
  setEventListeners(){
    // добавлять обработчик сабмита формы.
    this._submit.form.addEventListener('submit', this._bindGetInputValues);
    super.setEventListeners();
  }

  // Универсальный обработчик submit
  _getInputValues(evt){
    const {_submit, _labelArray, _loadStatusButton} = this;
    evt.preventDefault();

    // сохраняем начальный label у submit
    const label = _submit.textContent;
    // запускаем анимацию загрузки и сохраняем в stop её id для остановки
    // передаём массив вариантов label, если он передан в конструктор
    const stop = _labelArray ? _loadStatusButton(_submit, _labelArray) : _loadStatusButton(_submit);

    // запускаем реквест-функцию из конструктора
    this._request(evt)
    .then((res)=>{
      this.closePopup();
      // останавливаем анимацию и возвращаем начальное имя
      _loadStatusButton(_submit, [label], stop);
    })
    .catch((err)=>{
      console.log(err);
      _loadStatusButton(_submit, [`Ошибка: ${err.status}`], stop);
      // возвращаем начальное имя спустя пару секунд шока
      setTimeout(()=>_loadStatusButton(_submit, [label], stop), 2000);
    });
  }

  // Индикация обработки данных
  _loadStatusButton(_submit, textArr , intervalId) {
    if(!intervalId){
      let flag = 0;
      // берём случайный label из массива
      const textId = Math.floor(Math.random() * textArr.length);
      // возвращаем ID для его отключения
      return setInterval(()=>{
          flag++;
          const dots = new Array(flag % 5).join('.');
          _submit.textContent = textArr[textId] + dots;
        }, 400);
    } else {
      // останавливаем анимацию и возвращаем label
      clearInterval(intervalId);
      _submit.textContent = textArr[0];
    }
  }
}
