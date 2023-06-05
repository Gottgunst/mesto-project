import { delCard, likeCard } from './buttons.js';
import { gatherCard, renderCard } from './card.js';
import { initialCards, newCards } from './data.js';
import { handleImageFormSubmit, closePopup, handleProfileFormSubmit, openPopup, openPopupImage } from './modal.js';
import { enableValidation, disableValidation } from './validate.js';

import '../page/index.css';

// ######################
// Конфигурация элементов
// ######################

// Карточки
const cardContainer = document.querySelector('.elements__grid');
const templateCard = document.querySelector('#templateCard').content;

// Данные пользователя
const profile = {
  name: document.querySelector('.profile__name'),
  subtitle: document.querySelector('.profile__subtitle')
};

// Формы
const inputProfile = {
  form: document.forms.editInfo,
  button: document.forms.editInfo.elements.button,
  inactiveButtonClass: 'popup__submit_disabled',
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
};

const inputImage = {
  form: document.forms.addImage,
  button: document.forms.addImage.elements.button,
  inactiveButtonClass: 'popup__submit_disabled',
  // inputErrorClass: 'popup__field-error',
  // errorClass: 'popup__error',
};


// Модальные окна
const popupArray = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-profile');
const popupAddImage = document.querySelector('#popup-add');

// Модальное окно с полноформатным изображением с подписью
const imagePopup = {
  container: document.querySelector('#popup-image'),
  image: document.querySelector('.popup__image'),
  caption: document.querySelector('.popup__caption'),
};

// #####################
// Инициализация функций
// #####################

// Получаем массив заготовленных элементов
const initialElements = initialCards.map(cardObject => gatherCard(cardObject, templateCard));

// Рендерим массив заготовленных элементов
initialElements.forEach(el => renderCard(el, cardContainer));

// Всплытие событий клика мыши
window.addEventListener('mousedown', (evt) => {

  // Кнопка редактирования профиля
  if(evt.target.classList.contains('profile__button_type_edit')){
    // Устанавливаем данные пользователя в поля ввода
    inputProfile.form.name.value = profile.name.textContent;
    inputProfile.form.subtitle.value = profile.subtitle.textContent;

    openPopup(popupEditProfile, inputProfile);
    enableValidation(inputProfile);
  } else

  // Кнопка добавления изображения
  if(evt.target.classList.contains('profile__button_type_add')){
    openPopup(popupAddImage, inputImage);
    enableValidation(inputImage);
  } else

  // ловим лайк
  if(evt.target.classList.contains('element__button-like')){
    likeCard(evt);
  } else

  // ловим закрытие модального окна
  if(evt.target.classList.contains('popup__close')){
    closePopup();
    disableValidation();
  } else

  // ловим открытие карточки
  if(evt.target.classList.contains('element__image')){
    if(evt.target.getAttribute('data-init')==='true'){
      const targetId = evt.target.closest('.element__wrapper').id;
      // const allCards = initialCards.concat(newCards);
      const targetCard = initialCards.filter(card => card._id === targetId);
      openPopupImage(targetCard[0], imagePopup);
    } else {
      openPopupImage({
        title: evt.target.alt,
        image: evt.target.src,
        initial: false,
      }, imagePopup);
    }
  } else

  // ловим удаление карточки
  if(evt.target.classList.contains('element__button-del')){
    delCard(evt);
  }

});


// После загрузки страницы сменяем display с "none" на "flex",
// чтобы при первичной загрузке не было паразитной анимации
window.onload = popupArray.forEach(el => el.classList.add('popup_flexed'));


// Связываем кнопки и обработчик данных
inputProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleProfileFormSubmit(profile, inputProfile);

  closePopup();
  disableValidation();
});

inputImage.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //Получение → Сборка → Отображение данных карточки
  renderCard( gatherCard( handleImageFormSubmit(inputImage), templateCard), cardContainer);

  closePopup();
  evt.target.reset();
  disableValidation();
});






