import { path, workData } from './api.js';
import { gatherCard, renderCard } from './card.js';
import { handleSubmit } from './input.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, toggleButton } from './validate.js';

import '../page/index.css';

// ######################
// Конфигурация элементов
// ######################

// Карточки
const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;

// Данные пользователя
const profile = {
  name: document.querySelector('.profile__name'),
  subtitle: document.querySelector('.profile__subtitle'),
  avatar: document.querySelector('.profile__avatar'),
  avatarWrapper: document.querySelector('.profile__avatar-wrapper'),
};

// Формы
const formsPrefs = {
  formSelector: 'popup__form',
  inputSelector: 'popup__field',
  submitButtonSelector: 'popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorFieldSelector: '[name="err-', // ${evt.target.name}"]
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
};

const inputProfile = {
  form: document.querySelector('.popup__form[name="editInfo"]'),
  name: document.querySelector('.popup__field[name="name"]'),
  subtitle: document.querySelector('.popup__field[name="subtitle"]'),
  button: document.querySelector('.popup__form[name="editInfo"] > .popup__submit'),
};

const inputImage = {
  form: document.querySelector('.popup__form[name="addImage"]'),
  title: document.querySelector('.popup__field[name="title"]'),
  url: document.querySelector('.popup__field[name="url"]'),
  button: document.querySelector('.popup__form[name="addImage"] > .popup__submit'),
};

const inputAvatar = {
  form: document.querySelector('.popup__form[name="changeAvatar"]'),
  url: document.querySelector('.popup__field[name="urlAvatar"]'),
  button: document.querySelector('.popup__form[name="changeAvatar"] > .popup__submit'),
};

const inputDelCard = {
  form: document.querySelector('.popup__form[name="delCard"]'),
  button: document.querySelector('.popup__form[name="delCard"] > .popup__submit'),
};

// Модальные окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');
const popupEditAvatar = document.querySelector('#popup-avatar');
const popupDelCard = {
  container: document.querySelector('#popup-delCard'),
  title: document.querySelector('.popup__title_type_del-card'),
  button: inputDelCard.button,
}


// Модальное окно с полноформатным изображением с подписью
const popupImage = {
  container: document.querySelector('#popup-image'),
  image: document.querySelector('.popup__image'),
  caption: document.querySelector('.popup__caption'),
};

// Кнопки
const buttonEditProfile = document.querySelector('.profile__button_type_edit');
const buttonAddImage = document.querySelector('.profile__button_type_add');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

// #####################
// Инициализация функций
// #####################


// Заполняем сайт данными с сервера
Promise.all([workData(path.user) , workData(path.cards)])
  .then((initial)=>{
    window.userData = initial[0];

    profile.name.textContent = window.userData.name;
    profile.subtitle.textContent = window.userData.about;
    profile.avatar.src = window.userData.avatar;

    const initialElements = initial[1].map(cardObject => gatherCard(cardObject, templateCard, popupImage, popupDelCard));
    initialElements.forEach(el => renderCard(el, cardContainer, 'append'));

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
      return workData(path.user, 'patch',
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
      return workData(path.cards, 'post',
      {
        name: inputImage.title.value,
        link: inputImage.url.value,
      })
      .then((res)=>{
        renderCard( gatherCard( res , templateCard, popupImage, popupDelCard), cardContainer, 'prepend');
        evt.target.reset();
        toggleButton(formsPrefs, inputImage.form);
      })
    });
});


inputAvatar.form.addEventListener('submit', (evt) => {
  handleSubmit(evt, inputAvatar.button, ()=>
  {
    return workData(path.avatar, 'PATCH',
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
    return workData(`${path.cards}/${window.cardToDelete.id}`, 'delete')
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
