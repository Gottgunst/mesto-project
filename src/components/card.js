import { delCard, likeCard } from './buttons';
import { openPopupImage } from './modal';

// #########################
// Image Card Crate Function
// #########################

export function gatherCard(cardObject, templateCard, imagePopup) {

  const cardElement = templateCard.querySelector('.element__wrapper').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const caption = cardElement.querySelector('.element__caption');

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

  image.addEventListener('mousedown', () => openPopupImage(cardObject, imagePopup));
  cardElement.querySelector('.element__button-like').addEventListener('mousedown', likeCard);
  cardElement.querySelector('.element__button-del').addEventListener('mousedown', delCard);



  return cardElement;
}


// ##########################
// Image Card Render Function
// ##########################

export function renderCard(cardElement, cardContainer) {
  cardContainer.prepend(cardElement);
}
