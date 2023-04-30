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

  // Фиксируем страницу убирая scroll
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = 'fixed';

  // корректируем положение контента на фоне в зависимости от ширины экрана
  if(window.screen.width > 918){
    document.body.style.left = '50%';
    document.body.style.marginLeft = '-459px';
  } else {
    document.body.style.width = window.screen.width + 'px';
  }
}

function popupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');

  // возвращаем пользователя на прежнее место
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.marginLeft = '';
  document.body.style.width  = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
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

export function popupOpenImage(imageObject) {

  const popupImageContainer = document.querySelector('#popup-image');
  const popupImage = popupImageContainer.querySelector('.popup__image');
  const popupCaption = popupImageContainer.querySelector('.popup__caption');

  popupCaption.textContent = imageObject.title;

  if(imageObject.initial) {

    const imageName = imageObject.image.slice(0, imageObject.image.indexOf('.',-1));

    popupImage.sizes = `(max-width: 2000px) 100vw, 2000px`;

    popupImage.srcset = imageObject.imageSet.map(width =>
      `./images/places/${imageName}_${width}.jpeg ${width},`);

    popupImage.src = './images/places/'+imageObject.image;

  } else {

    popupImage.sizes ='';
    popupImage.srcset ='';
    popupImage.src = imageObject.image;

  }

  popupImage.alt = imageObject.imageAlt || imageObject.title;

  popupOpen('#popup-image');
}
