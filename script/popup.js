// ######################
// POP-UP toggle function
// ######################

const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonAdd = document.querySelector('.profile__button_type_add');
const buttonsClose = document.querySelectorAll('.popup__close');

// после загрузки сайта сменяем "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
const popups = document.querySelectorAll('.popup');
popups.forEach(el => el.style.display="flex");

buttonEdit.addEventListener('click', popupOpen.bind(null, '#popup-profile'));
buttonAdd.addEventListener('click', popupOpen.bind(null, '#popup-add'));
buttonsClose.forEach(button => button.addEventListener('click', popupClose));



function popupOpen(popupSelector) {
  document.querySelector(popupSelector).classList.add('popup_opened');

  // Фиксируем body убирая scroll
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add('page_fixed');

}

function popupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');

  // Открепляем body возвращая scroll сохранив позицию прокрутки
  document.body.classList.remove('page_fixed');
  const scrollY = document.body.style.top;
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.body.removeAttribute('style');
}

// ###################
// POP-UP connect data
// ###################

import {initialCards} from './data.js';
import {addCard} from './card.js';

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

  profileName.textContent =
  inputName.value.replace(/\s/g, '').length ? inputName.value : inputName.value = 'Безымянный';

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
    initial: false,
  });

  // запускаем функцию по рендеру карточки
  addCard(initialCards[initialCards.length-1]);

  popupClose(evt);
}

formEdit.addEventListener('submit', formEditHandler);
formAdd.addEventListener('submit', formAddHandler);


// #################
// POP-UP open image
// #################

const popupImageContainer = document.querySelector('#popup-image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupCaption = popupImageContainer.querySelector('.popup__caption');

export function popupOpenImage(imageObject) {

  //обнуляю данные, чтобы избавиться от паразитных данных прошлой итерации
  popupImage.sizes ='';
  popupImage.srcset ='';
  popupImage.src = '';

  popupCaption.textContent = imageObject.title;

  if(imageObject.initial) {

    const imageName = imageObject.image.slice(0, imageObject.image.indexOf('.',-1));

    popupImage.sizes = `(max-width: 2000px) 100vw, 2000px`;

    popupImage.srcset = imageObject.imageSet.map(width =>
      `./images/places/${imageName}_${width}.jpeg ${width},`);

    popupImage.src = './images/places/'+imageObject.image;

  } else {

    popupImage.src = imageObject.image;

  }

  popupImage.alt = imageObject.imageAlt || imageObject.title;

  popupOpen('#popup-image');
}
