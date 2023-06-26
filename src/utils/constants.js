import Api from "../components/api.js";
import Card from '../components/card.js';
import Popup from '../components/modal.js';
import Section from '../components/section.js';

// ######################
// Конфигурация API
// ######################

// Создаем инстанс класса Api
 export const mestoApi = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'd709f1d7-61bc-4f4a-a795-fd13fa11ff95',
    'Content-Type': 'application/json'
  },
  paths: {
    user: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    likes: '/cards/likes'
  }
});

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
  popups: {
    open: popupImage,
    del: popupDelCard,
  }
};

// ######################
// Конфигурация секции
// ######################

const cardContainer = document.querySelector('.elements__grid');

export const cardSection = new Section({
    items: [],
    renderer: (cardObject)=>new Card(cardObject, cardConfig)
  },
  cardContainer);


// ######################
// Конфигурация модальных окон
// ######################

// Модальные окна

export const popupEditProfile = new Popup('#popup-profile');
export const popupAddImage = new Popup('#popup-add');
export const popupEditAvatar = new Popup('#popup-avatar');

export const popupDelCard = {
  container: document.querySelector('#popup-delCard'),
  title: document.querySelector('.popup__title_type_del-card'),
  button: inputDelCard.button,
}

// Модальное окно с полноформатным изображением с подписью
export const popupImage = {
  container: document.querySelector('#popup-image'),
  image: document.querySelector('.popup__image'),
  caption: document.querySelector('.popup__caption'),
};

