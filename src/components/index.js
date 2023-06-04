import { initialCards, newCards } from './data.js';
import { gatherCard, renderCard } from './card.js';
import { openPopup, closePopup, editFormHandler, addFormHandler, openPopupImage } from './modal.js';
import { delCard, likeCard } from './buttons.js';

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
  form: document.forms.editInfo,
  name: document.forms.editInfo.elements.name,
  errName: document.querySelector('[name="err-name"]'),
  subtitle: document.forms.editInfo.elements.subtitle,
  errSubtitle: document.querySelector('[name="err-subtitle"]'),
  button: document.forms.editInfo.elements.button,
};

const inputImage = {
  form: document.forms.addImage,
  title: document.forms.addImage.elements.title,
  errTitle: document.querySelector('[name="err-title"]'),
  url: document.forms.addImage.elements.url,
  errUrl: document.querySelector('[name="err-url"]'),
  button: document.forms.addImage.elements.button,
};


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

  if(evt.target.classList.contains('popup__close')){
    closePopup();
    // disableValidation(evt);
  }
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
  // enableValidation();
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddImage, inputImage);
  // enableValidation();
});

// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  editFormHandler(evt, profile, inputProfile);
  closePopup();
  // disableValidation();
});

inputImage.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //Получение → Сборка → Отображение данных карточки
  renderCard( gatherCard( addFormHandler(evt, inputImage), templateCard), cardContainer);

  closePopup();
  evt.target.reset();
  // disableValidation();

  //ТУТ блокировка кнопки сабмит
});






