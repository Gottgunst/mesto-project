import { checkSpace, sliceExt } from "./utilities.js";

// ######################
// POP-UP Toggle Function
// ######################

function fixPopup() {
  if(document.body.classList.contains('page_fixed')){
    // Открепляем body возвращая scroll сохранив позицию прокрутки
    document.body.classList.remove('page_fixed');
    const scrollY = document.body.style.top;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.body.removeAttribute('style');
  } else {
    // Фиксируем body убирая scroll
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add('page_fixed');
  }
}

function escPopup(popupElement, evt) {
  if(evt.key === 'Escape'){
    closePopup(popupElement);
  }
}

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  fixPopup();
  document.addEventListener('keydown', escPopup.bind(null, popupElement))
}

export function closePopup(evt) {
  const popup = evt.target ? evt.target : evt;
  popup.closest('.popup').classList.remove('popup_opened');
  fixPopup();
  document.removeEventListener('keydown', escPopup);
}

// ########################
// POP-UP Profile Form Data
// ########################

export function editFormHandler(evt, profile, input) {
  evt.preventDefault();

  // проверка на поле состоящее из пробелов?
  profile.name.textContent = checkSpace(input.name.value);
  profile.subtitle.textContent = input.subtitle.value;

  closePopup(evt);
}

// ########################
// POP-UP Image Form Data
// ########################

export function addFormHandler(evt, input) {
  evt.preventDefault();

  const newCard = {
    title: input.title.value,
    image: input.url.value,
    initial: false,
  };

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

    const imageName = sliceExt(cardObject.image);

    // Обозначение свойства <img sizes="">
    // для правильной работы адаптивности <img scrset="">
    templatePopup.image.sizes = `(max-width: 2000px) 100vw, 2000px`;
    templatePopup.image.srcset = cardObject.imageSet.map(width =>
      `./images/places/${imageName}_${width}.jpeg ${width},`);

    templatePopup.image.src = './images/places/'+cardObject.image;

  } else {

    templatePopup.image.src = cardObject.image;

  }

  templatePopup.image.alt = cardObject.imageAlt || cardObject.title;

  openPopup(templatePopup.container);
}
