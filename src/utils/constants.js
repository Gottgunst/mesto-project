import FormValidator from "../components/validate.js";
import Api from "../components/api.js";
import { likeCard } from '../components/buttons.js';
import Card from '../components/card.js';
import { PopupDelete, PopupImage, PopupSubmit } from '../components/modal.js';
import Section from '../components/section.js';
import { toggleButton } from '../components/validate.js';

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
  fn: {
    open: (image, caption)=>popupImage.openPopup(image, caption),
    del: (evt)=>popupDelCard.openPopup(evt),
    like: (evt)=>likeCard(evt),
  }
};

// ######################
// Конфигурация FormValidator
// ######################

const formValidatorImage = new FormValidator(formsPrefs, inputImage.form);
const formValidatorAvatar = new FormValidator(formsPrefs, inputAvatar.form);
const formValidatorProfile = new FormValidator(formsPrefs, inputProfile.form);

const formValidators = {
  Image: formValidatorImage,
  Avatar: formValidatorAvatar,
  Profile: formValidatorProfile
}

export const {
  Image,
  Avatar,
  Profile
} = formValidators;

// ######################
// Конфигурация секции
// ######################

export const cardSection = new Section({
    items: [],
    renderer: (cardObject)=>new Card(cardObject, cardConfig)
  },
  '.elements__grid');

// ######################
// Конфигурация модальных окон
// ######################

export const popupEditProfile = new PopupSubmit('#popup-profile', ()=>
  {
    return mestoApi.workData({key:'user'}, 'patch',
    {
      name: inputProfile.name.value,
      about: inputProfile.subtitle.value
    })
    .then((res)=>{
      profile.name.textContent = res.name;
      profile.subtitle.textContent = res.about;
    })
  },
  [
    'Переписываем',
    'Исправляем',
    'Меняем',
  ]);

export const popupAddImage = new PopupSubmit('#popup-add', (evt)=>
  {
    return mestoApi.workData({key:'cards'}, 'post',
    {
      name: inputImage.title.value,
      link: inputImage.url.value,
    })
    .then((res)=>{

      cardSection.addItem(new Card(res, cardConfig));

      evt.target.reset();
      toggleButton(formsPrefs, inputImage.form);
    })
  });

export const popupEditAvatar = new PopupSubmit('#popup-avatar', (evt)=>
  {
    return mestoApi.workData({key:'avatar'}, 'PATCH',
    {
      avatar: inputAvatar.url.value
    })
    .then((res)=>{
      document.querySelector('.profile__avatar').src = res.avatar;
      evt.target.reset();
      toggleButton(formsPrefs, inputAvatar.form);
    })
  });


export const popupImage = new PopupImage('#popup-image');
export const popupDelCard = new PopupDelete('#popup-delCard', (evt)=>
  {
    return mestoApi.workData({key:'cards', id: window.cardToDelete.id}, 'delete')
    .then((res)=>{
      window.cardToDelete.remove();
    })
  },
  [
    'Стираем',
    'Удаляем',
    'Забываем',
  ]);

