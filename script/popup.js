// ######################
// POP-UP toggle function
// ######################

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');

const buttonsClose = document.querySelectorAll('.popup__close');

buttonEdit.addEventListener('click', popupOpen.bind(null, '#popup-profile'));
buttonAdd.addEventListener('click', popupOpen.bind(null, '#popup-add'));
buttonsClose.forEach(button => button.addEventListener('click', popupClose));

function popupOpen(popupSelector) {
  document.querySelector(popupSelector).classList.add('popup_opened');
}

function popupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

// ###################
// POP-UP connect data
// ###################

import {initialCards} from './data.js';
import {addCard} from './image-add.js';

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('#name');
const inputSubtitle = document.querySelector('#subtitle');

const formEdit = document.querySelector('[name="edit-info"]');
const formAdd = document.querySelector('[name="add-image"]');

inputName.value = profileName.textContent;
inputSubtitle.value = profileSubtitle.textContent;

// функция по правке данных о пользователе
function formEditHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  popupClose(evt);
}

// функция по добавлению новых данных об изображениях
function formAddHandler(evt) {
  evt.preventDefault();
  const imageTitle = evt.target.closest('.popup').querySelector('#imageName').value;
  const imageURL = evt.target.closest('.popup').querySelector('#imageLink').value;

  //добавляем новые данные в базу
  initialCards.push({
    title: imageTitle,
    image: imageURL,
  });

  // запускаем функцию по рендеру карточки
  addCard(initialCards[initialCards.length-1]);

  popupClose(evt);
}

formEdit.addEventListener('submit', formEditHandler);
formAdd.addEventListener('submit', formAddHandler);
