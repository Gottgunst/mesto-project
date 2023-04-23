// POP-UP FUNCTION

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonClose = document.querySelector('.popup__close');

const popupClass = 'popup';
const popupClassMod = '_opened';

buttonEdit.addEventListener('click', popupToggle);
buttonClose.addEventListener('click', popupToggle);

function popupToggle() {
  document.querySelector(`.${popupClass}`)
          .classList.toggle(`${popupClass}${popupClassMod}`);
}
