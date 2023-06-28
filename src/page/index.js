import { Image, Avatar, Profile } from '../utils/constants.js';
import { enableValidation } from '../components/validate.js';



import './index.css';

import {
  mestoApi,
  cardSection,
  profile,
  formsPrefs,
  inputProfile,
  inputAvatar,
  popupEditProfile,
  popupAddImage,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddImage,
}  from '../utils/constants.js';

// #####################
// Инициализация функций
// #####################


// Заполняем сайт данными с сервера
Promise.all([mestoApi.workData({key:'user'}), mestoApi.workData({key:'cards'})])
  .then((initial)=>{
    window.userData = initial[0];

    profile.name.textContent = window.userData.name;
    profile.subtitle.textContent = window.userData.about;
    profile.avatar.src = window.userData.avatar;

    cardSection.items = initial[1];
    cardSection.addArray();

  })
  .catch((err)=>{
    console.log(err);
  });


// Запуск валидации на всех формах
Image.enableValidation();
Avatar.enableValidation();
Profile.enableValidation();

// Подключение событий клика на кнопки
profile.avatarWrapper.addEventListener('click', ()=>{
  // Устанавливаем адрес аватара в поля ввода
  inputAvatar.url.value = profile.avatar.src;
  popupEditAvatar.openPopup();
});


buttonAddImage.addEventListener('click',() => {
  popupAddImage.openPopup();
});


buttonEditProfile.addEventListener('click',() => {
  const evtInput = new Event('input');
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = profile.name.textContent;
  inputProfile.subtitle.value = profile.subtitle.textContent;
  popupEditProfile.openPopup();
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});

