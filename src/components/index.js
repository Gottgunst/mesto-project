import { getData, pathConfig } from './api.js';
import { gatherCard, renderCard } from './card.js';
// import { initialCards } from './data.js';
import { handleImageFormSubmit, handleProfileFormSubmit, openPopup, closePopup } from './modal.js';
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
  avatar: document.querySelector('.profile__avatar')
};

// Получаем данные c сервера
window.userData = await getData(pathConfig.userPath);
const initCards = await getData(pathConfig.cardsPath);

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
};

const inputImage = {
  form: document.querySelector('.popup__form[name="addImage"]'),
  title: document.querySelector('.popup__field[name="title"]'),
  url: document.querySelector('.popup__field[name="url"]'),
};

// Модальные окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');

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
initialElements.forEach(el => renderCard(el, cardContainer));

// Запуск валидации на всех формах
enableValidation(formsPrefs);

// Подключение событий клика на кнопки
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
inputProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleProfileFormSubmit(profile, inputProfile);
  closePopup();
});

inputImage.form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  //Получение → Сборка → Отображение данных карточки
  renderCard( gatherCard( await handleImageFormSubmit(inputImage) , templateCard, imagePopup), cardContainer);
  closePopup();
  evt.target.reset();
  toggleButton(formsPrefs, inputImage.form);
});






