// ##################
// Image add function
// ##################

import { initialCards } from './data.js';
import { openPopupImage } from './popup.js';
import { delCard, likeCard } from './buttons.js';

const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;

export function addCard(imageObject) {

  const cardElement = templateCard.querySelector('li').cloneNode(true);

  //проверяем название карточки, не состоит ли оно только из пробелов
  cardElement.querySelector('.element__caption').textContent =
    imageObject.title.replace(/\s/g, '').length ? imageObject.title : imageObject.title = 'Безымянный';

  cardElement.querySelector('.element__button-del').addEventListener('click', delCard);
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);
  const image = cardElement.querySelector('.element__image');

  // проверяем данные изображения — оно из базы данных или загружено пользователем
  if (imageObject.initial) {

    const imageName = imageObject.image.slice(0, imageObject.image.indexOf('.',-1));
    image.src = `./images/places/${imageName}_thumb.jpeg`;

  } else {

    image.src = imageObject.image;

  }

  image.alt = imageObject.imageAlt || imageObject.title;
  image.addEventListener('click', openPopupImage.bind(null, imageObject));

  cardContainer.append(cardElement);

}

initialCards.forEach(obj => addCard(obj));
