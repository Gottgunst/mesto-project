import { likeCard } from '../components/buttons.js';
import { formValidatorAvatar, formValidatorImage, formValidatorProfile,   } from "../page/index.js";




// ######################
// Конфигурация элементов
// ######################

// Данные пользователя
export const profile = {
  name: document.querySelector('.profile__name'),
  subtitle: document.querySelector('.profile__subtitle'),
  avatar: document.querySelector('.profile__avatar'),
  avatarWrapper: document.querySelector('.profile__avatar-wrapper'),
};

// Формы
export const formsPrefs = {
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorFieldSelector: '[name="err-', // ${evt.target.name}"]
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
};

export const inputProfile = {
  form: document.querySelector('.popup__form[name="editInfo"]'),
  name: document.querySelector('.popup__field[name="name"]'),
  subtitle: document.querySelector('.popup__field[name="subtitle"]'),
  button: document.querySelector('.popup__form[name="editInfo"] > .popup__submit'),
};

export const inputImage = {
  form: document.querySelector('.popup__form[name="addImage"]'),
  title: document.querySelector('.popup__field[name="title"]'),
  url: document.querySelector('.popup__field[name="url"]'),
  button: document.querySelector('.popup__form[name="addImage"] > .popup__submit'),
};

export const inputAvatar = {
  form: document.querySelector('.popup__form[name="changeAvatar"]'),
  url: document.querySelector('.popup__field[name="urlAvatar"]'),
  button: document.querySelector('.popup__form[name="changeAvatar"] > .popup__submit'),
};

export const inputDelCard = {
  form: document.querySelector('.popup__form[name="delCard"]'),
  button: document.querySelector('.popup__form[name="delCard"] > .popup__submit'),
};

// Кнопки
export const buttonEditProfile = document.querySelector('.profile__button_type_edit');
export const buttonAddImage = document.querySelector('.profile__button_type_add');


// ######################
// Конфигурация карточек
// ######################

export const cardConfig = {
  template: '#templateCard',
  cardEls: {
    image: '.element__image',
    caption: '.element__caption',
    counter: '.element__likes-counter',
    delButton: '.element__button-del',
    like: '.element__button-like',
    likeActive: 'element__button-like_active'
  },
  backendKeys: {
    image: 'link',
    caption: 'name',
    counter: 'likes',
    id: '_id',
    owner: 'owner',
  },
  fn: {
    open: (image, caption)=>popupImage.openPopup(image, caption),
    del: (evt)=>popupDelCard.openPopup(evt),
    like: (evt)=>likeCard(evt),
  }
};



