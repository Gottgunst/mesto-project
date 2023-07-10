import Api from "../components/api.js"
import FormValidator from '../components/validate.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import UserInfo from "../components/user-info.js";
import { PopupSubmit, PopupImage, PopupDelete } from "../components/modals";

import './index.css';

import {
  userProfile,
  inputProfile,
  inputAvatar,
  inputImage,
  buttonEditProfile,
  buttonAddImage,
}  from '../utils/constants.js';


// ######################
// Конфигурация Api
// ######################
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
// Конфигурация карточек
// ######################
function getNewCard(cardObject){
  const cardConfig = {
    template: '#templateCard',
    cardEls: {
      image: '.element__image',
      caption: '.element__caption',
      counter: '.element__likes-counter',
      delButton: '.element__button-del',
      like: '.element__button-like',
      likeActive: 'element__button-like_active',
      likeLoad: 'element__button-like_load',
    },
    backendKeys: {
      image: 'link',
      caption: 'name',
      counter: 'likes',
      id: '_id',
      owner: 'owner',
    },
    sockets: {
      userId: userMesto.userInfo.id,
      openImage: (image, caption)=>popupImage.openPopup(image, caption),
      deleteImage: (cardId, that)=>popupDelCard.openPopup(cardId, that),
      likeRequest: function (idCard, method) {
        // используем декларативное объявление функции
        // стрелочная функция теряет контекст!
        // запрос на сервер
        mestoApi.workData({key : 'likes', id : idCard}, method)
        .then((res)=>{
          const cardObject = res;
          // если всё ок, вносим данные
          this._setLikes(cardObject.likes.length);
        })
        .catch((err)=>{
          console.log(err);
        });
      },
    }
  };

  return new Card(cardObject, cardConfig).getCard();
}

// ######################
// Конфигурация FormValidator
// ######################
const formsValidator = {
  image: new FormValidator(inputImage.form),
  avatar: new FormValidator(inputAvatar.form),
  profile: new FormValidator(inputProfile.form)
}

// ######################
// Конфигурация секции
// ######################
const cardSection = new Section({
    items: [],
    renderer: (cardObject)=>getNewCard(cardObject)
  },
  '.elements__grid');

// ######################
// Конфигурация UserInfo
// ######################
const userMesto = new UserInfo();

// ######################
// Конфигурация модальных окон
// ######################
const popupEditProfile = new PopupSubmit(
  "#popup-profile",
  function() {
    mestoApi
      .workData({ key: "user" }, "patch", this.getInputValues())
      .then((userData) => {
        userMesto.userInfo = userData;
        this.succeedSubmit();
      })
      .catch((err)=>{
        console.log(err);
        this.errSubmit(err);
      });
  },
  ["Переписываем", "Исправляем", "Меняем"]
);
popupEditProfile.setEventListeners();


const popupAddImage = new PopupSubmit("#popup-add",
  async function(evt) {
  return mestoApi
    .workData({ key: "cards" }, "post", this.getInputValues())
    .then((res) => {
      cardSection.addItem(getNewCard(res));

      evt.target.reset();
      formsValidator.image.toggleButton();
      this.succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      this.errSubmit(err);
    });
  });
popupAddImage.setEventListeners();


const popupEditAvatar = new PopupSubmit("#popup-avatar",
  async function (evt){
  return mestoApi
    .workData({ key: "avatar" }, "patch", this.getInputValues())
    .then((userData) => {

      userMesto.userInfo = userData;

      evt.target.reset();
      formsValidator.avatar.toggleButton();
      this.succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      this.errSubmit(err);
    });
  });
popupEditAvatar.setEventListeners();


const popupImage = new PopupImage("#popup-image");
popupImage.setEventListeners();


const popupDelCard = new PopupDelete(
  "#popup-delCard",
  async function() {
    return mestoApi
      .workData({ key: "cards", id: this.cardIdToDelete }, "delete")
      .then((res) => {
        this.cardContext.removeCard();
        this.succeedSubmit();
      })
      .catch((err)=>{
        console.log(err);
        this.errSubmit(err);
      });
  },
  ["Стираем", "Удаляем", "Забываем"]
);
popupDelCard.setEventListeners();


// #####################
// Инициализация функций
// #####################

// Заполняем сайт данными с сервера
Promise.all([mestoApi.workData({key:'user'}), mestoApi.workData({key:'cards'})])
  .then((initial)=>{

    userMesto.userInfo = initial[0];

    cardSection.items = initial[1];
    cardSection.addArray();

  })
  .catch((err)=>{
    console.log(err);
  });

// Запуск валидации на всех формах
formsValidator.image.enableValidation();
formsValidator.avatar.enableValidation();
formsValidator.profile.enableValidation();


// Подключение событий клика на кнопки
userProfile.avatarWrapperProfile.addEventListener('click', ()=>{
  // Устанавливаем адрес аватара в поля ввода
  inputAvatar.url.value = userMesto.userInfo.avatar;
  popupEditAvatar.openPopup();
});


buttonAddImage.addEventListener('click',() => {
  popupAddImage.openPopup();
});


buttonEditProfile.addEventListener('click',() => {
  const evtInput = new Event('input');

  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = userMesto.userInfo.name;
  inputProfile.subtitle.value = userMesto.userInfo.subtitle;
  popupEditProfile.openPopup();
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});




