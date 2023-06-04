import { newCards } from './data.js';
import { genId, sliceExt } from "./utils.js";
import { enableValidation, disableValidation } from './validate.js';

// ######################
// POP-UP Toggle Function
// ######################

export function openPopup(popupElement, formObjects=undefined) {
  // если открываем модальное окно с формой, запускаем валидацию форм
  fixPopup(true);
  if(formObjects){
    enableValidation(formObjects);
  }
  popupElement.classList.add('popup_opened');

  const escPopupBind = escPopup.bind(null, popupElement);
  const clickHandlerBind = clickHandler.bind(null, formObjects, popupElement, escPopupBind, clickHandlerBind);

  document.addEventListener('keydown', escPopupBind);
  popupElement.addEventListener('click', clickHandlerBind);
}

function clickHandler(formObjects=undefined, popupElement, escPopupBind, clickHandlerBind, evt){

  // switch (evt.target.className) {
  //     case 'popup__close':
  //     case 'popup__bg':
  //       closePopup(evt);
  //       document.removeEventListener('keydown', escPopupBind);
  //       if(formObjects){
  //           disableValidation(formObjects);
  //           popupElement.removeEventListener('click', clickHandlerBind);
  //       }
  //       break;
  // }
}

export function closePopup(evt) {
  const popup = evt.target;
  popup.closest('.popup').classList.remove('popup_opened');
  fixPopup(false);
}

function escPopup(popupElement, evt) {
  if(evt.key === 'Escape'){
    popupElement.querySelector('.popup__bg').click();
  }
}

// ########################
// POP-UP Profile Form Data
// ########################

export function editFormHandler(evt, profile, input) {
  evt.preventDefault();

  profile.name.textContent = input.name.value;
  profile.subtitle.textContent = input.subtitle.value;

  closePopup(evt);
}

// ########################
// POP-UP Image Form Data
// ########################

export function addFormHandler(evt, input) {
  evt.preventDefault();

  const newCard = {
    _id: genId(),
    title: input.title.value,
    image: input.url.value,
    initial: false,
  };

  newCards.push(newCard);

  closePopup(evt);
  evt.target.reset();

  return newCard;
}

// #################
// POP-UP Open Image
// #################

export function openPopupImage(cardObject, templatePopup) {

  //обнуляю данные, чтобы избавиться от паразитных данных прошлой итерации
  templatePopup.image.sizes ='';
  templatePopup.image.srcset ='';
  templatePopup.image.src = '';

  templatePopup.caption.textContent = cardObject.title;

  // если карточка из заготовленных используем расширенный функционал
  if(cardObject.initial) {

    // Обозначение свойства <img sizes="">
    // для правильной работы адаптивности <img scrset="">
    templatePopup.image.sizes = `(max-width: 2000px) 100vw, 2000px`;
    templatePopup.image.srcset = cardObject.images.map((img, index) =>
      index===0 ? '':
      `${img} ${sliceExt(img)},`
    );

    templatePopup.image.src = cardObject.image;

  } else {

    templatePopup.image.src = cardObject.image;

  }

  templatePopup.image.alt = cardObject.imageAlt || cardObject.title;

  openPopup(templatePopup.container);
}



function fixPopup(fix) {
  if (fix) {
    // Фиксируем body убирая scroll
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add('page_fixed');
  } else {
    // Открепляем body возвращая scroll сохранив позицию прокрутки
    document.body.classList.remove('page_fixed');
    const scrollY = document.body.style.top;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.body.removeAttribute('style');
  }
}

