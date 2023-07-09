import {PopupSubmit} from '.';

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

    // Переменная для ссылки на карточку.
    this._cardIdToDelete;
    this._cardContext;
  }

  openPopup(cardId, that){

    const {_titleEl, _submit } = this;
    const { activeLike } = this._style;

    // Резервируем id и контекст карточки для её удаления
    this._cardIdToDelete = cardId;
    this._cardContext = that;

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
