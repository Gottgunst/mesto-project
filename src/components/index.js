import { path, workData } from './api.js';
import { gatherCard, renderCard } from './card.js';
// import { initialCards } from './data.js';
import { handleImageFormSubmit, handleProfileFormSubmit, handleAvatarFormSubmit } from './input.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, toggleButton } from './validate.js';

import '../page/index.css';
import { loadStatusButton } from './buttons.js';


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

// Получаем данные c сервера
window.userData = await workData(path.user);
const initCards = await workData(path.cards);

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

// Модальные окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');
const popupEditAvatar = document.querySelector('#popup-avatar');

// Модальное окно с полноформатным изображением с подписью
const imagePopup = {
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
profile.name.textContent = window.userData.name;
profile.subtitle.textContent = window.userData.about;
profile.avatar.src = window.userData.avatar;

const initialElements = initCards.map(cardObject => gatherCard(cardObject, templateCard, imagePopup));
initialElements.forEach(el => renderCard(el, cardContainer, 'append'));

// Запуск валидации на всех формах
enableValidation(formsPrefs);

// Подключение событий клика на кнопки
profile.avatarWrapper.addEventListener('click', ()=>{
  // Устанавливаем адрес аватара в поля ввода
  inputAvatar.url.value = profile.avatar.src;
  openPopup(popupEditAvatar);
});

buttonAddImage.addEventListener('click',() => {
  openPopup(popupAddImage, inputImage);
});

buttonEditProfile.addEventListener('click',() => {

  const evtInput = new Event('input');

  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = profile.name.textContent;
  inputProfile.subtitle.value = profile.subtitle.textContent;

  openPopup(popupEditProfile, inputProfile);

  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});

buttonsClosePopup.forEach(button =>
  button.addEventListener('mousedown',() => closePopup()));

// После загрузки страницы сменяем display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));

// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const stop = loadStatusButton(inputProfile.button);
  await handleProfileFormSubmit(profile, inputProfile);
  loadStatusButton(inputProfile.button, stop);
  closePopup();
});

inputImage.form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  //Получение → Сборка → Отображение данных карточки
  const stop = loadStatusButton(inputImage.button);

  renderCard( gatherCard( await handleImageFormSubmit(inputImage) , templateCard, imagePopup), cardContainer, 'prepend');

  loadStatusButton(inputImage.button, stop);
  closePopup();
  evt.target.reset();
  toggleButton(formsPrefs, inputImage.form);
});

inputAvatar.form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const avatar = document.querySelector('.profile__avatar');
  const stop = loadStatusButton(inputAvatar.button);

  const newAva = await handleAvatarFormSubmit(inputAvatar);
  avatar.src = newAva.avatar;

  loadStatusButton(inputAvatar.button, stop);
  closePopup();
  evt.target.reset();
  toggleButton(formsPrefs, inputAvatar.form);
});



