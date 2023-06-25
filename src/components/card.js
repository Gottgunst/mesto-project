import { likeCard } from './buttons';
import { handleCardDelate } from './input';
import { openPopupImage } from './modal';

// #########################
// Image Card Create Function
// #########################

export function gatherCard(cardObject, templateCard, popupImage, popupDelCard) {

  const cardElement = templateCard.querySelector('.element__wrapper').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const caption = cardElement.querySelector('.element__caption');
  const delButton = cardElement.querySelector('.element__button-del');
  const counter = cardElement.querySelector('.element__likes-counter');


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

  if(cardObject.likes.length>0) {
    counter.textContent = cardObject.likes.length;
    if(cardObject.likes.some(user => user._id === window.userData._id))
      cardElement.querySelector('.element__button-like')
        .classList.add('element__button-like_active');
  }else{
    counter.textContent = "";
  }

  image.addEventListener('click', () => openPopupImage(cardObject, popupImage));
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);

  cardObject.owner._id === window.userData._id ?
    delButton.addEventListener('click', (evt)=> handleCardDelate(evt, popupDelCard)) :
    delButton.remove();

  return cardElement;
}


// ##########################
// Image Card Render Function
// ##########################

export function renderCard(cardElement, cardContainer, way='prepend') {
  cardContainer[way](cardElement);
}
