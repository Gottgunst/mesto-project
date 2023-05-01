import { checkSpace } from "./check.js";

// ######################
// POP-UP Toggle Function
// ######################

export function openPopup(popupElement, profile = false, inputProfile = false) {

  popupElement.classList.add('popup_opened');

  // Если работаем с формой профиля, устанавливаем данные полей
  if(profile && inputProfile){
    inputProfile.name.value = profile.name.textContent;
    inputProfile.subtitle.value = profile.subtitle.textContent;
  }

  // Фиксируем body убирая scroll
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add('page_fixed');

}

export function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');

  // Открепляем body возвращая scroll сохранив позицию прокрутки
  document.body.classList.remove('page_fixed');
  const scrollY = document.body.style.top;
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.body.removeAttribute('style');
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

export function openPopupImage(cardObject) {

  //обнуляю данные, чтобы избавиться от паразитных данных прошлой итерации
  popupImage.sizes ='';
  popupImage.srcset ='';
  popupImage.src = '';

  popupCaption.textContent = imageObject.title;

  if(imageObject.initial) {

    const imageName = imageObject.image.slice(0, imageObject.image.indexOf('.',-1));

    popupImage.sizes = `(max-width: 2000px) 100vw, 2000px`;

    popupImage.srcset = imageObject.imageSet.map(width =>
      `./images/places/${imageName}_${width}.jpeg ${width},`);

    popupImage.src = './images/places/'+imageObject.image;

  } else {

    popupImage.src = imageObject.image;

  }

  popupImage.alt = imageObject.imageAlt || imageObject.title;

  openPopup('#popup-image');
}
