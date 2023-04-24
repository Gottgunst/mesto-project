// POP-UP toggle function

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonClose = document.querySelector('.popup__close');

buttonEdit.addEventListener('click', popupToggle.bind(null, 'popup','_opened'));
buttonClose.addEventListener('click', popupToggle.bind(null, 'popup','_opened'));

function popupToggle(popupClass, popupClassMod) {
  document.querySelector(`.${popupClass}`)
          .classList.toggle(`${popupClass}${popupClassMod}`);
}

// POP-UP connect name and subtitle data

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('#name');
const inputSubtitle = document.querySelector('#subtitle');

const formElement = document.querySelector('.popup__form');

inputName.value = profileName.textContent;
inputSubtitle.value = profileSubtitle.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent= inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  popupToggle('popup','_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
