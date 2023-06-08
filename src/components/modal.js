import { patchData, pathConfig, postData } from './api.js';
import { genId, sliceExt } from "./utils.js";

// ######################
// POP-UP Toggle Function
// ######################

window.currPopup = {}; // ссылка на открытый popup

export function openPopup(popupElement) {
  fixPopup(true);
  window.currPopup = popupElement;
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
}

export function closePopup() {
  window.currPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  fixPopup(false);
}

function handleEscape(evt) {
  if(evt.key === 'Escape'){
    closePopup();
  }
}

// ########################
// POP-UP Profile Form Data
// ########################

export async function handleProfileFormSubmit(profile, {form}) {

  const res = await patchData(pathConfig.userPath,
  {
    name: form.name.value,
    about: form.subtitle.value
  });

  profile.name.textContent = res.name;
  profile.subtitle.textContent = res.about;
}

// ########################
// POP-UP Image Form Data
// ########################

export async function handleImageFormSubmit({form}) {
  const newCard = await postData(pathConfig.cardsPath,
  {
    name: form.title.value,
    link: form.url.value,
  });
  return newCard;
}

// #################
// POP-UP Open Image
// #################

export function openPopupImage(cardObject, imagePopup) {
  //обнуляю данные, чтобы избавиться от паразитных данных прошлой итерации
  // imagePopup.image.sizes = '';
  // imagePopup.image.srcset = '';
  imagePopup.image.src = '';

  imagePopup.caption.textContent = cardObject.name;

  // если карточка из заготовленных используем расширенный функционал
  // if(cardObject.initial) {
  //   // Обозначение свойства <img sizes="">
  //   // для правильной работы адаптивности <img scrset="">
  //   imagePopup.image.sizes = `(max-width: 2000px) 100vw, 2000px`;
  //   imagePopup.image.srcset = cardObject.images.map((img, index) =>
  //     index===0 ? '':
  //     `${img} ${sliceExt(img)},`
  //   );
  // }

  imagePopup.image.src = cardObject.link;
  imagePopup.image.alt = cardObject.name; //cardObject.imageAlt ||

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

