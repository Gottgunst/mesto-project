// #################
// POP-UP Mother Class
// #################

export class Popup{
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
