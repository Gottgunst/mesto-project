import { gatherCard, renderCard } from './card.js';
import { initialCards } from './data.js';
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
  subtitle: document.querySelector('.profile__subtitle')
};


// Формы
const inputProfile = {
  form: '.popup__form[name="editInfo"]',
  button: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
};

const inputImage = {
  form: '.popup__form[name="addImage"]',
  button: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
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

// Получаем массив заготовленных элементов
const initialElements = initialCards.map(cardObject => gatherCard(cardObject, templateCard, imagePopup));

// Рендерим массив заготовленных элементов
initialElements.forEach(el => renderCard(el, cardContainer));

// Запуск валидации на указанных формах
enableValidation(inputProfile);
enableValidation(inputImage);

// Подключение событий клика на кнопки
buttonAddImage.addEventListener('mousedown',() =>
  openPopup(popupAddImage, inputImage)
);
buttonEditProfile.addEventListener('mousedown',() => {
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.form.name.value = profile.name.textContent;
  inputProfile.form.subtitle.value = profile.subtitle.textContent;
  openPopup(popupEditProfile, inputProfile);
});
buttonsClosePopup.forEach(button =>
  button.addEventListener('mousedown',() =>
    closePopup()
));


// После загрузки страницы сменяем display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));

// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleProfileFormSubmit(profile, inputProfile);
  closePopup();
});

inputImage.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  //Получение → Сборка → Отображение данных карточки
  renderCard( gatherCard( handleImageFormSubmit(inputImage), templateCard, imagePopup), cardContainer);
  closePopup();
  evt.target.reset();
  toggleButton();
});






