import {PopupAdvance} from '.';

// #################
// POP-UP Delete Class
// #################

export class PopupDelete extends PopupAdvance{
   constructor(popupSelector, request, labelArray,
    styleDelCfg = {
      wrapper: '.element__wrapper',
      activeLike: '.element__button-like_type_active',
      title: '.popup__title_type_del-card'
  }, ...args)
  {
    super(popupSelector, request, labelArray, ...args);

    // Расширяю настройки имен стилей
    this._style.title = styleDelCfg.title;
    this._style.wrapper = styleDelCfg.wrapper;
    this._style.activeLike = styleDelCfg.activeLike;

    // находим элементы
    this._titleEl = this._popupElement.querySelector(this._style.title);

    // Переменная для ссылки на карточку.
    this.cardIdToDelete;
    this.cardContext;
  }

  openPopup(cardId, that){

    const {_titleEl, _submit } = this;
    const { activeLike } = this._style;

    // Резервируем id и контекст карточки для её удаления
    this.cardIdToDelete = cardId;
    this.cardContext = that;

    super.openPopup();

    // Давим на жалость
    if (document.getElementById(cardId).querySelector(activeLike)){
      _titleEl.textContent = 'Любимую карточку?';
      _submit.textContent = 'Удалить';
    } else {
      _titleEl.textContent = 'Вы уверены?'
      _submit.textContent = 'Да';
    }
  }
}
