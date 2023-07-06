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
      likeRequest: (idCard, method, setLikes) => {
        // запрос на сервер
        mestoApi.workData({key : 'likes', id : idCard}, method)
        .then((res)=>{
          const cardObject = res;
          // если всё ок, вносим данные
          setLikes(cardObject.likes.length);
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
export const formsValidator = {
  image: new FormValidator(inputImage.form),
  avatar: new FormValidator(inputAvatar.form),
  profile: new FormValidator(inputProfile.form)
}

// ######################
// Конфигурация секции
// ######################
export const cardSection = new Section({
    items: [],
    renderer: (cardObject)=>getNewCard(cardObject)
  },
  '.elements__grid');

// ######################
// Конфигурация UserInfo
// ######################
export const userMesto = new UserInfo(userProfile);

// ######################
// Конфигурация модальных окон
// ######################
export const popupEditProfile = new PopupSubmit(
  "#popup-profile",
  (evt, _succeedSubmit, _errSubmit) => {
   mestoApi
    .workData({ key: "user" }, "patch", {
      name: inputProfile.name.value,
      about: inputProfile.subtitle.value,
    })
    .then((userData) => {
    userMesto.workUserInfo(userData)
    })
    .then((res) => {
      _succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      _errSubmit(err);
    }),
  ["Переписываем", "Исправляем", "Меняем"]
  });
popupEditProfile.setEventListeners();

export const popupAddImage = new PopupSubmit("#popup-add", (evt, _succeedSubmit, _errSubmit) => {
  return mestoApi
    .workData({ key: "cards" }, "post", {
      name: inputImage.title.value,
      link: inputImage.url.value,
    })
    .then((res) => {
      cardSection.addItem(getNewCard(res));

      evt.target.reset();
      formsValidator.image.toggleButton();
      _succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      _errSubmit(err);
    });
});
popupAddImage.setEventListeners();

export const popupEditAvatar = new PopupSubmit("#popup-avatar", (evt, _succeedSubmit, _errSubmit) => {
  return mestoApi
    .workData({ key: "avatar" }, "patch", { avatar: inputAvatar.url.value })
    .then((userData) => {
    userMesto.workUserInfo(userData)
  })
    .then((res) => {
      evt.target.reset();
      formsValidator.avatar.toggleButton();
      _succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      _errSubmit(err);
    });
});
popupEditAvatar.setEventListeners();


export const popupImage = new PopupImage("#popup-image");
popupImage.setEventListeners();

export const popupDelCard = new PopupDelete(
  "#popup-delCard",
  (evt, _succeedSubmit, _errSubmit) => {
    return mestoApi
      .workData({ key: "cards", id: window.cardToDelete.id }, "delete")
      .then((res) => {
        window.cardToDelete.remove();
       _succeedSubmit();
    })
    .catch((err)=>{
      console.log(err);
      _errSubmit(err);
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
  // Создаем локальную переменную с обьектом данных пользователя
  const userInfoData = userMesto.userInfo;
  // Устанавливаем адрес аватара в поля ввода
  inputAvatar.url.value = userInfoData.avatar;
  popupEditAvatar.openPopup();
});


buttonAddImage.addEventListener('click',() => {
  popupAddImage.openPopup();
});


buttonEditProfile.addEventListener('click',() => {
  const evtInput = new Event('input');
  // Создаем локальную переменную с обьектом данных пользователя
  const userInfoData = userMesto.userInfo;
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = userInfoData.name;
  inputProfile.subtitle.value = userInfoData.subtitle;
  popupEditProfile.openPopup();
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});




