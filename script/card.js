// ##################
// Image add function
// ##################

import { initialCards } from './data.js';
import { popupOpenImage } from './popup.js';
import { imageDel, imageLike } from './buttons.js';

const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;


initialCards.forEach(image => addCard(image));


export function addCard(imageObject) {

  const cardElement = templateCard.querySelector('li').cloneNode(true);

  //проверяем название карточки, не состоит ли оно только из пробелов
  cardElement.querySelector('.element__caption').textContent =
    imageObject.title.replace(/\s/g, '').length ? imageObject.title : imageObject.title = 'Безымянный';

  cardElement.querySelector('.element__button-del').addEventListener('click', imageDel);
  cardElement.querySelector('.element__button-like').addEventListener('click', imageLike);
  const image = cardElement.querySelector('.element__image');

  // проверяем данные изображения — оно из базы данных или загружено пользователем
  if (imageObject.initial) {

    const imageName = imageObject.image.slice(0, imageObject.image.indexOf('.',-1));

    image.sizes = `
      (min-width: 920px) 282px,
      (min-width: 620px) calc(50vw - 27px),
      (min-width: 380px) calc(100vw - 38px),
      calc(66.67vw + 82px)`;

    image.srcset = imageObject.thumbSet.map(thumb =>
          `./images/places/${imageName}_${thumb}_thumb.jpeg ${thumb},`);

    image.src = `./images/places/${imageName}_${imageObject.thumbSet[0]}_thumb.jpeg`;

  } else {

    image.src = imageObject.image;

  }

  image.alt = imageObject.imageAlt || imageObject.title;
  image.addEventListener('click', popupOpenImage.bind(null, imageObject));

  cardContainer.append(cardElement);

}
