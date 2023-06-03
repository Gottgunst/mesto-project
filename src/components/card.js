// #########################
// Image Card Crate Function
// #########################

export function gatherCard(cardObject, templateCard) {

  const cardElement = templateCard.querySelector('.element__wrapper').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  const caption = cardElement.querySelector('.element__caption');

  cardElement.id = cardObject._id;

  // проверяем данные карточки — она из базы данных или загружена пользователем
  if (cardObject.initial) {
    image.src = cardObject.images[0];
  } else {
    image.src = cardObject.image;
  }

  image.alt = cardObject.imageAlt || cardObject.title;
  caption.textContent = cardObject.title;

  return cardElement;
}

// ##########################
// Image Card Render Function
// ##########################

export function renderCard(cardElement, cardContainer) {
  cardContainer.prepend(cardElement);
}
