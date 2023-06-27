import { Card } from '../components/card.js';
import { handleSubmit } from '../components/input.js';
import { openPopup, closePopup } from '../components/modal.js';
import { Image, Avatar, Profile } from '../utils/constants.js';


import './index.css';

import {
  mestoApi,
  cardConfig,
  cardContainer,
  profile,
  formsPrefs,
  inputProfile,
  inputImage,
  inputAvatar,
  inputDelCard,
  popupArray,
  popupEditProfile,
  popupAddImage,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddImage,
  buttonsClosePopup }  from '../utils/constants.js';



  // #####################
// Инициализация функций
// #####################

// Заполняем сайт данными с сервера
Promise.all([mestoApi.workData(['user']), mestoApi.workData(['cards'])])
  .then((initial)=>{
    window.userData = initial[0];

    profile.name.textContent = window.userData.name;
    profile.subtitle.textContent = window.userData.about;
    profile.avatar.src = window.userData.avatar;


    initial[1].forEach(cardObject => {
      new Card(cardObject,cardConfig).render(cardContainer, 'append');
    });


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
  openPopup(popupEditAvatar);
});


buttonAddImage.addEventListener('click',() => {
  openPopup(popupAddImage);
});


buttonEditProfile.addEventListener('click',() => {
  const evtInput = new Event('input');
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = profile.name.textContent;
  inputProfile.subtitle.value = profile.subtitle.textContent;
  openPopup(popupEditProfile);
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});


buttonsClosePopup.forEach(button =>
  button.addEventListener('mousedown', closePopup));


// После загрузки страницы сменяем display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));


// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputProfile.button, ()=>
    {
      return mestoApi.workData(['user'], 'patch',
      {
        name: inputProfile.name.value,
        about: inputProfile.subtitle.value
      })
      .then((res)=>{
        profile.name.textContent = res.name;
        profile.subtitle.textContent = res.about;
      })
    });
});


inputImage.form.addEventListener('submit', (evt) => {
    handleSubmit(evt, inputImage.button, ()=>
    {
      return mestoApi.workData(['cards'], 'post',
      {
        name: inputImage.title.value,
        link: inputImage.url.value,
      })
      .then((res)=>{
        new Card(res,cardConfig).render(cardContainer, 'prepend');

        evt.target.reset();
        Image.toggleButton();
      })
    });
});


inputAvatar.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputAvatar.button, ()=>
  {
    return mestoApi.workData(['avatar'], 'PATCH',
    {
      avatar: inputAvatar.url.value
    })
    .then((res)=>{
      document.querySelector('.profile__avatar').src = res.avatar;
      evt.target.reset();
      Avatar.toggleButton();
    })
  });
});


inputDelCard.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputDelCard.button, ()=>
  {
    return mestoApi.workData(['cards', window.cardToDelete.id], 'delete')
    .then((res)=>{
      window.cardToDelete.remove();
    })
  },
  [
    'Стираем',
    'Удаляем',
    'Забываем',
  ]);
});
