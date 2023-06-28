// #################
// POP-UP Mother Class
// #################

export default class Popup{
  constructor(popupSelector,
    styleCfg = {
    open: 'popup_opened',
    close: '.popup__close',
    flex: 'popup_flexed',
    fixPage: 'page_fixed',
  })
  {
    // Находим элемент по селектору
    this._popupElement = document.querySelector(popupSelector);

    // Настройки имен стилей
    this._style = styleCfg;

    // Сменяем display с "none" на "flex",
    // чтобы при первичной загрузке не было паразитной анимации
    this._popupElement.classList.add(this._style.flex);

    // Закрепляем функцию для сохранения контекста
    // и возможности удалить слушатель по её имени
    this._bindHandleEsc = this._handleEscape.bind(this);
    this._bindClose = this.closePopup.bind(this);

    // делаем установку слушателей или вручную, или в конечных наследниках
    // this.setEventListeners();
  }

  // Открыть окно
  openPopup() {
    const {open} = this._style;

    this._fixPopup(true);

    this._popupElement.classList.add(open);
    document.addEventListener('keydown', this._bindHandleEsc);
  }

  // Закрыть окно
  closePopup() {
    const {open} = this._style;

    this._popupElement.classList.remove(open);
    document.removeEventListener('keydown', this._bindHandleEsc);

    this._fixPopup(false);
  }

  // Уст. слушателей на кнопки закрытия
  setEventListeners(){
    const {close} = this._style;

    this._popupElement.querySelectorAll(close).forEach(
      button => button.addEventListener('mousedown',this._bindClose)
    );
  }

  // Ловим кнопку Esc
  _handleEscape(evt) {
    if(evt.key === 'Escape'){
      this.closePopup();
    }
  }

  // фиксации модального окна
  // относительно положения
  // прокрутки страницы
  _fixPopup(fix) {
    const {fixPage} = this._style;

    if (fix) {
      // Фиксируем body убирая scroll
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add(fixPage);
    } else {
      // Открепляем body возвращая scroll сохранив позицию прокрутки
      const scrollY = document.body.style.top;
      document.body.classList.remove(fixPage);
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      document.body.removeAttribute('style');
    }
  }

}

// #################
// POP-UP Image Class
// #################

export class PopupImage extends Popup{
  constructor(popupSelector,
    styleImgCfg = {
    image: '.popup__image',
    caption: '.popup__caption',
  }, ...args)
  {
    super(popupSelector, ...args);

    // Расширяю настройки имен стилей
    this._style.image = styleImgCfg.image;
    this._style.caption = styleImgCfg.caption;
    // находим элементы
    this._imageEl = this._popupElement.querySelector(this._style.image);
    this._captionEl = this._popupElement.querySelector(this._style.caption);

    super.setEventListeners();
  }

  openPopup(image, caption){
    const {_imageEl, _captionEl} = this;
    //обнуляю данные, чтобы избавиться
    // от паразитных данных прошлой итерации
    _imageEl.src = '';
    _captionEl.textContent = caption;

    _imageEl.src = image;
    _imageEl.alt = caption;

    super.openPopup();
  }
}


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

    this.setEventListeners();
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


// #################
// POP-UP Delete Class
// #################

export class PopupDelete extends PopupSubmit{
   constructor(popupSelector, request, labelArray,
    styleDelCfg = {
    title: '.popup__title_type_del-card',
    wrapper: '.element__wrapper',
    activeLike: '.element__button-like_active',
  }, ...args)
  {
    super(popupSelector, request, labelArray, ...args);

    // Расширяю настройки имен стилей
    this._style.title = styleDelCfg.title;
    this._style.wrapper = styleDelCfg.wrapper;
    this._style.activeLike = styleDelCfg.activeLike;
  }

  openPopup(evt){
    const {_titleEl, _submit } = this;
    const { activeLike, wrapper } = this._style;

    super.openPopup();

    // Резервируем объект для удаления
    window.cardToDelete = evt.target.closest(wrapper);

    // Давим на жалость
    if (evt.target.closest(wrapper).querySelector(activeLike)){
      _titleEl.textContent = 'Любимую карточку?';
      _submit.textContent = 'Удалить';
    } else {
      _titleEl.textContent = 'Вы уверены?'
      _submit.textContent = 'Да';
    }
  }
}
