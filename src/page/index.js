import Api from "../components/api.js"
import FormValidator from '../components/validate.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import UserInfo from "../components/user-info.js";
import { PopupSubmit, PopupImage, PopupDelete } from "../components/modal.js";


import './index.css';

import {
  profile,
  formsPrefs,
  inputProfile,
  inputAvatar,
  inputImage,
  buttonEditProfile,
  buttonAddImage,
  cardConfig
}  from '../utils/constants.js';

// ######################
// Конфигурация UserInfo
// ######################
const userInfo = new UserInfo(profile)

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
export const formValidatorImage = new FormValidator(inputImage.form);
export const formValidatorAvatar = new FormValidator(inputAvatar.form);
export const formValidatorProfile = new FormValidator(inputProfile.form);

// обьект с инстансами класса FormValidator
export const formsValidator = {
  image: formValidatorImage,
  avatar: formValidatorAvatar,
  profile: formValidatorProfile
}

// ######################
// Конфигурация секции
// ######################

export const cardSection = new Section({
  items: [],
  renderer: (cardObject)=>new Card(cardObject, cardConfig)
},
'.elements__grid');

// Заполняем сайт данными с сервера
Promise.all([mestoApi.workData({key:'user'}), mestoApi.workData({key:'cards'})])
  .then((initial)=>{
    window.userData = initial[0];

    userInfo.setUserInfo(initial[0]);

    cardSection.items = initial[1];
    cardSection.addArray();

  })
  .catch((err)=>{
    console.log(err);
  });


// ######################
// Конфигурация модальных окон
// ######################

export const popupEditProfile = new PopupSubmit('#popup-profile', ()=> userInfo.setUserInfo({
  name: inputProfile.name.value,
  about: inputProfile.subtitle.value
}),
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
    formsValidator.image.toggleButton();
  })
});

export const popupEditAvatar = new PopupSubmit('#popup-avatar', ()=> userInfo.setUserInfo({
  avatar: inputAvatar.url.value
}, 'avatar'))

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



// #####################
// Инициализация функций
// #####################



// Запуск валидации на всех формах
formsValidator.image.enableValidation();
formsValidator.avatar.enableValidation();
formsValidator.profile.enableValidation();

// Подключение событий клика на кнопки
profile.avatarWrapperProfile.addEventListener('click', ()=>{
  // Устанавливаем адрес аватара в поля ввода
  inputAvatar.url.value = userInfo.getUserInfo().avatar;
  popupEditAvatar.openPopup();
});


buttonAddImage.addEventListener('click',() => {
  popupAddImage.openPopup();
});


buttonEditProfile.addEventListener('click',() => {
  const evtInput = new Event('input');
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = userInfo.getUserInfo().name;
  inputProfile.subtitle.value = userInfo.getUserInfo().subtitle;
  popupEditProfile.openPopup();
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});


