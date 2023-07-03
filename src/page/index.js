import Api from "../components/api.js"
import FormValidator from '../components/validate.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import UserInfo from "../components/user-info.js";
import { PopupSubmit, PopupImage, PopupDelete } from "../components/modal.js";


import './index.css';

import {
  userProfile,
  inputProfile,
  inputAvatar,
  inputImage,
  buttonEditProfile,
  buttonAddImage,
  cardConfig
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
    renderer: (cardObject)=>new Card(cardObject, cardConfig).getCard()
  },
  '.elements__grid');

// ######################
// Конфигурация UserInfo
// ######################
const userMesto = new UserInfo(userProfile, (path, body)=>
  mestoApi.workData({key: path}, 'patch', body));

// ######################
// Конфигурация модальных окон
// ######################
export const popupEditProfile = new PopupSubmit(
  "#popup-profile",
  () =>
    userMesto.workUserInfo("user", {
      name: inputProfile.name.value,
      about: inputProfile.subtitle.value,
    }),
  ["Переписываем", "Исправляем", "Меняем"]
);
popupEditProfile.setEventListeners();

export const popupAddImage = new PopupSubmit("#popup-add", (evt) => {
  return mestoApi
    .workData({ key: "cards" }, "post", {
      name: inputImage.title.value,
      link: inputImage.url.value,
    })
    .then((res) => {
      cardSection.addItem(new Card(res, cardConfig).getCard());

      evt.target.reset();
      formsValidator.image.toggleButton();
    });
});
popupAddImage.setEventListeners();

export const popupEditAvatar = new PopupSubmit("#popup-avatar", (evt) => {
  return userMesto
    .workUserInfo("avatar", { avatar: inputAvatar.url.value })
    .then((res) => {
      evt.target.reset();
      formsValidator.avatar.toggleButton();
    });
});
popupEditAvatar.setEventListeners();


export const popupImage = new PopupImage("#popup-image");
popupImage.setEventListeners();

export const popupDelCard = new PopupDelete(
  "#popup-delCard",
  (evt) => {
    return mestoApi
      .workData({ key: "cards", id: window.cardToDelete.id }, "delete")
      .then((res) => {
        window.cardToDelete.remove();
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
    window.userData = initial[0];

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


