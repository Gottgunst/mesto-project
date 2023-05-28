import { initialCards } from './data.js';
import { gatherCard, renderCard } from './card.js';
import { openPopup, closePopup, editFormHandler, addFormHandler } from './modal.js';

import '../page/index.css';

// ######################
// Конфигурация элементов
// ######################

// Карточки
const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;

// Данные пользователя
const profile = { name:{}, subtitle:{} };
profile.name = document.querySelector('.profile__name');
profile.subtitle = document.querySelector('.profile__subtitle');

// Формы
const formEdit = document.forms.editInfo;
const formAdd = document.forms.addImage;

// Содержимое форм
const inputProfile = { name:{}, subtitle:{}, button:{} };
inputProfile.name = formEdit.elements.name;
inputProfile.subtitle = formEdit.elements.subtitle;
inputProfile.button = formEdit.elements.button;

const inputImage = { title:{}, url:{}, button:{} };
inputImage.title = formAdd.elements.title;
inputImage.url = formAdd.elements.url;
inputImage.button = formAdd.elements.button;

// Кнопки вне форм
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const buttonsClose = document.querySelectorAll('.popup__close');

// Модальные окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');
const popupBg = document.querySelectorAll('.popup__bg');

// Модальное окно с полноформатным изображением с подписью
const templatePopup = { container:{}, image:{}, caption: {} };
templatePopup.container = document.querySelector('#popup-image');
templatePopup.image = templatePopup.container.querySelector('.popup__image');
templatePopup.caption = templatePopup.container.querySelector('.popup__caption');

// #####################
// Инициализация функций
// #####################

// Получаем массив заготовленных элементов
const initialElements = initialCards.map(cardObject => gatherCard(cardObject, templateCard, templatePopup));

// Рендерим массив заготовленных элементов
initialElements.forEach(el => renderCard(el, cardContainer));

// После загрузки страницы сменяем display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));

// Связываем кнопки и модальные окна
buttonEdit.addEventListener('click', () => {
  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = profile.name.textContent;
  inputProfile.subtitle.value = profile.subtitle.textContent;
  openPopup(popupEditProfile, inputProfile);
});
buttonAdd.addEventListener('click', () => {
  // Очищаем поля ввода
  formAdd.reset();
  openPopup(popupAddImage, inputImage);
});
buttonsClose.forEach(button => button.addEventListener('click', closePopup));
popupBg.forEach(bg => bg.addEventListener('click', closePopup));

// Связываем кнопки и обработчик данных
formEdit.addEventListener('submit', (evt) => {editFormHandler(evt, profile, inputProfile)});
formAdd.addEventListener('submit', (evt) => {
  renderCard( gatherCard( addFormHandler(evt, inputImage), templateCard, templatePopup), cardContainer)});





