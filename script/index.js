import { initialCards } from './data.js';
import { gatherCard, renderCard } from './card.js';
import { openPopup, closePopup, editFormHandler, addFormHandler, openPopupImage } from './popup.js';

// ######################
// Конфигурация элементов
// ######################

// Карточки
const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;

// Кнопки
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const buttonsClose = document.querySelectorAll('.popup__close');

// Данные пользователя
const profile = { name:{}, subtitle:{} };
profile.name = document.querySelector('.profile__name');
profile.subtitle = document.querySelector('.profile__subtitle');

// Поля ввода данных
const inputProfile = { name:{}, subtitle:{} };
inputProfile.name = document.querySelector('#name');
inputProfile.subtitle = document.querySelector('#subtitle');

const inputImage = { title:{}, url:{} };
inputImage.title = document.querySelector('#imageName');
inputImage.url = document.querySelector('#imageLink');

// Формы
const formEdit = document.querySelector('[name="edit-info"]');
const formAdd = document.querySelector('[name="add-image"]');

// Всплывающие окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');
const popupImageContainer = document.querySelector('#popup-image');

// Полноформатное изображение с подписью
const fullscreen = { image:{}, caption: {} };
fullscreen.image = popupImageContainer.querySelector('.popup__image');
fullscreen.caption = popupImageContainer.querySelector('.popup__caption');

// #####################
// Инициализация функций
// #####################

// Получаем массив заготовленных элементов
const initialElements = initialCards.map(cardObject => gatherCard(cardObject, templateCard));

// Рендерим массив заготовленных элементов
initialElements.forEach(el => renderCard(el, cardContainer));

// После загрузки страницы сменяем Display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));

// Связываем кнопки и модальные окна
buttonEdit.addEventListener('click', openPopup.bind(null, popupEditProfile, profile, inputProfile));
buttonAdd.addEventListener('click', openPopup.bind(null, popupAddImage));
buttonsClose.forEach(button => button.addEventListener('click', closePopup));

// Связываем кнопки и обработчик данных
formEdit.addEventListener('submit', (evt) => {editFormHandler(evt, profile, inputProfile)});
formAdd.addEventListener('submit', (evt) => {
  renderCard( gatherCard( addFormHandler(evt, inputImage), templateCard), cardContainer)});





