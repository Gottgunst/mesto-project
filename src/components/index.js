import { initialCards, newCards } from './data.js';
import { gatherCard, renderCard } from './card.js';
import { openPopup, editFormHandler, addFormHandler, openPopupImage, closePopup } from './modal.js';
import { delCard, likeCard } from './buttons.js';

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
const inputProfile =
  { name:{}, subtitle:{}, button:{} };
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

// #####################
// Инициализация функций
// #####################

// Получаем массив заготовленных элементов
const initialElements = initialCards.map(cardObject => gatherCard(cardObject, templateCard));

// Рендерим массив заготовленных элементов
initialElements.forEach(el => renderCard(el, cardContainer));

// Всплытие событий клика мыши
window.addEventListener('mousedown', (evt) => {

  if(evt.target.classList.contains('element__button-like'))
    likeCard(evt);

  if(evt.target.classList.contains('element__button-del'))
    delCard(evt);

  if(evt.target.classList.contains('element__image')){
    const targetId = evt.target.closest('.element__wrapper').id;
    const allCards = initialCards.concat(newCards);
    const targetCard = allCards.filter(card => card._id === targetId);
    openPopupImage(targetCard[0], imagePopup);
  }

  if(evt.target.classList.contains('popup__close'))
    closePopup(evt);

});

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
  openPopup(popupAddImage, inputImage);
});

// Связываем кнопки и обработчик данных
formEdit.addEventListener('submit', (evt) => {editFormHandler(evt, profile, inputProfile)});
formAdd.addEventListener('submit', (evt) => {
  renderCard( gatherCard( addFormHandler(evt, inputImage), templateCard), cardContainer)});





