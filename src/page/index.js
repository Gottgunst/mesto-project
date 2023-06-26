import Card from '../components/card.js';
import { handleSubmit } from '../components/input.js';
import { enableValidation, toggleButton } from '../components/validate.js';


import './index.css';

import {
  mestoApi,
  cardConfig,
  cardSection,
  profile,
  formsPrefs,
  inputProfile,
  inputImage,
  inputAvatar,
  inputDelCard,
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
enableValidation(formsPrefs);


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



// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputProfile.button, ()=>
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
    });
});


inputImage.form.addEventListener('submit', (evt) => {
    handleSubmit(evt, inputImage.button, ()=>
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
});


inputAvatar.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputAvatar.button, ()=>
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
});


inputDelCard.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputDelCard.button, ()=>
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
});
