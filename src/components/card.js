import { getData, pathConfig } from './api';
import { delCard, likeCard } from './buttons';
import { openPopupImage } from './modal';

// #########################
// Image Card Crate Function
// #########################

export function gatherCard(cardObject, templateCard, imagePopup) {

  const cardElement = templateCard.querySelector('.element__wrapper').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const caption = cardElement.querySelector('.element__caption');
  const delButton = cardElement.querySelector('.element__button-del');

  cardElement.id = cardObject._id;
  caption.textContent = cardObject.name;

  // проверяем данные карточки — она из базы данных или загружена пользователем
  // if (cardObject.initial) {
  //   image.src = cardObject.images[0];
  // } else {
  image.src = cardObject.link;
  // }
  // image.setAttribute('data-init', cardObject.initial);
  image.alt = cardObject.title; // cardObject.imageAlt ||
  cardElement.querySelector('.element__likes-counter').textContent = cardObject.likes.length>0 ? cardObject.likes.length : "";

  image.addEventListener('click', () => openPopupImage(cardObject, imagePopup));
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);

  cardObject.owner._id === window.userData._id ?
    delButton.addEventListener('click', delCard) :
    delButton.parentNode.removeChild(delButton);

  return cardElement;
}


// ##########################
// Image Card Render Function
// ##########################

export function renderCard(cardElement, cardContainer, way='prepend') {
  cardContainer[way](cardElement);
}
