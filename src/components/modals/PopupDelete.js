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
