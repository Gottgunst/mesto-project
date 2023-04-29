import {initialCards} from './data.js';

const cardContainer = document.querySelector('.elements__grid');

export function addCard(imageObject) {
  const imageName = imageObject.imageName.indexOf('http', 0) === 0 ?
  imageObject.imageName.slice(0, imageObject.imageName.indexOf('.',-1)).slice(imageObject.imageName.indexOf('/',-1),-1)
  :
  imageObject.imageName.slice(0, imageObject.imageName.indexOf('.',-1));

  const imageSet =  imageObject.thumbSet && imageObject.thumbSet.length>0 ?
    `sizes='
      (min-width: 920px) 282px,
      (min-width: 620px) calc(50vw - 27px),
      (min-width: 380px) calc(100vw - 38px),
      calc(66.67vw + 82px)'
    srcset='${imageObject.thumbSet.map(thumb =>
      `./images/places/${imageName}_${thumb}_thumb.jpeg ${thumb},`)}'
    src='./images/places/${imageName}_${imageObject.thumbSet[0]}_thumb.jpeg'`
    :
    `src='${imageObject.imageName}'`;

  const cardLayout =
  `<li>
    <article class="element">
    <button class="button element__button-del" title="Удалить" type="button" aria-label="Удалить фотокарточку"></button>
    <img class='element__image'
      ${imageSet}
      alt='${imageObject.imageAlt || imageObject.title || imageName}'>
    <h2 class="element__caption">${imageObject.title || 'Безымянный'}</h2>
    <button class="button element__button-like" title="Нравится" type="button" aria-label="Нравится фотография"></button>
    </article>
  </li>`;

  cardContainer.insertAdjacentHTML('beforeend',cardLayout);
}


initialCards.forEach(image => addCard(image));
