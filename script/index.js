import { initialCards } from './data.js';
import { gatherCard, renderCard } from './card.js';
import { openPopup, closePopup, editFormHandler, addFormHandler } from './popup.js';

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
  openPopup(popupEditProfile);
});
buttonAdd.addEventListener('click', () => {
  // Очищаем поля ввода
  inputImage.title.value = "";
  inputImage.url.value = "";
  openPopup(popupAddImage);
});
buttonsClose.forEach(button => button.addEventListener('click', closePopup));
popupBg.forEach(bg => bg.addEventListener('click', closePopup));

// Связываем кнопки и обработчик данных
formEdit.addEventListener('submit', (evt) => {editFormHandler(evt, profile, inputProfile)});
formAdd.addEventListener('submit', (evt) => {
  renderCard( gatherCard( addFormHandler(evt, inputImage), templateCard, templatePopup), cardContainer)});





