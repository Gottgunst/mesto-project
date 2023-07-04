import { Popup } from './Popup';

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

    // super.setEventListeners();
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
