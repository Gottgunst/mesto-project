import { openPopupImage } from './popup.js';
import { delCard, likeCard } from './buttons.js';
import { checkSpace } from './check.js';

// #########################
// Image Card Crate Function
// #########################

export function gatherCard(cardObject, templateCard) {

  const cardElement = templateCard.querySelector('.element__wrapper').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const caption = cardElement.querySelector('.element__caption');

  cardElement.querySelector('.element__button-del').addEventListener('click', delCard);
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard);

  //проверяем название карточки, не состоит ли оно только из пробелов
  caption.textContent = checkSpace(cardObject.title);

  // проверяем данные изображения — оно из базы данных или загружено пользователем
  if (cardObject.initial) {

    const imageName = cardObject.image.slice(0, cardObject.image.indexOf('.',-1));
    image.src = `./images/places/${imageName}_thumb.jpeg`;

  } else {

    image.src = cardObject.image;

  }

  image.alt = cardObject.imageAlt || cardObject.title;
  image.addEventListener('click', openPopupImage.bind(null, cardObject));

  return cardElement;
}

// ##########################
// Image Card Render Function
// ##########################

export function renderCard(cardElement, cardContainer) {
  cardContainer.append(cardElement);
}
