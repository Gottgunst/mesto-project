// #################
// POP-UP Class
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

    this._setEventListeners();
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
  _setEventListeners(){
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
  constructor(popupSelector, styleImgCfg = {
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
// POP-UP Delete Class
// #################

export class PopupDelete extends Popup{
  constructor(popupSelector, styleDelCfg = {
    title: '.popup__title_type_del-card',
    wrapper: '.element__wrapper',
    activeLike: '.element__button-like_active',
    submit: '.popup__submit',
  }, ...args)
  {
    super(popupSelector, ...args);

    // Расширяю настройки имен стилей
    this._style.title = styleDelCfg.title;
    this._style.wrapper = styleDelCfg.wrapper;
    this._style.activeLike = styleDelCfg.activeLike;
    this._style.submit = styleDelCfg.submit;

    // находим элементы
    this._titleEl = this._popupElement.querySelector(this._style.title);
    this._submit = this._popupElement.querySelector(this._style.submit);
  }

  openPopup(evt){
    const {wrapper, activeLike} = this._style;
    super.openPopup();

    window.cardToDelete = evt.target.closest(wrapper);

    if (evt.target.closest(wrapper).querySelector(activeLike)){
      this._titleEl.textContent = 'Любимую карточку?';
      this._submit .textContent = 'Удалить';
    } else {
      this._titleEl.textContent = 'Вы уверены?'
      this._submit .textContent = 'Да';
    }
  }
}
