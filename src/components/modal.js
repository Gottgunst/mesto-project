// import { newCards } from './data.js';
import { genId, sliceExt } from "./utils.js";
import { disableValidation } from './validate.js';

// ######################
// POP-UP Toggle Function
// ######################

let currPopup = {}; // ссылка на открытый popup

export function openPopup(popupElement) {
  fixPopup(true);
  currPopup = popupElement;
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', escPopup);

}

export function closePopup() {
  currPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escPopup);
  fixPopup(false);
  currPopup = {};
}

function escPopup(evt) {
  if(evt.key === 'Escape'){
    closePopup();
    disableValidation();
  }
}

// ########################
// POP-UP Profile Form Data
// ########################

export function editFormHandler(profile, {form}) {
  profile.name.textContent = form.name.value;
  profile.subtitle.textContent = form.subtitle.value;
}

// ########################
// POP-UP Image Form Data
// ########################

export function addFormHandler({form}) {
  const newCard = {
    _id: genId(),
    title: form.title.value,
    image: form.url.value,
    initial: false,
  };

  // newCards.push(newCard);
  return newCard;
}

// #################
// POP-UP Open Image
// #################

export function openPopupImage(cardObject, imagePopup) {
  //обнуляю данные, чтобы избавиться от паразитных данных прошлой итерации
  imagePopup.image.sizes ='';
  imagePopup.image.srcset ='';
  imagePopup.image.src = '';

  imagePopup.caption.textContent = cardObject.title;

  console.log(cardObject);
  // если карточка из заготовленных используем расширенный функционал
  if(cardObject.initial) {
    // Обозначение свойства <img sizes="">
    // для правильной работы адаптивности <img scrset="">
    imagePopup.image.sizes = `(max-width: 2000px) 100vw, 2000px`;
    imagePopup.image.srcset = cardObject.images.map((img, index) =>
      index===0 ? '':
      `${img} ${sliceExt(img)},`
    );

    imagePopup.image.src = cardObject.image;

  } else {

    imagePopup.image.src = cardObject.image;

  }

  imagePopup.image.alt = cardObject.imageAlt || cardObject.title;

  openPopup(imagePopup.container);
}

// #################
// фиксации модального окна относительно положения прокрутки страницы
// #################

function fixPopup(fix) {
  if (fix) {
    // Фиксируем body убирая scroll
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add('page_fixed');
  } else {
    // Открепляем body возвращая scroll сохранив позицию прокрутки
    const scrollY = document.body.style.top;
    document.body.classList.remove('page_fixed');
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.body.removeAttribute('style');
  }
}

