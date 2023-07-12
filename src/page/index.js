import Api from '../components/api.js';
import FormValidator from '../components/validate.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import UserInfo from '../components/user-info.js';
import { PopupSubmit, PopupImage, PopupDelete } from '../components/modals';

import './index.css';

import {
  avatarWrapper,
  inputProfile,
  inputAvatarUrl,
  buttonEditProfile,
  buttonAddImage,
} from '../utils/constants.js';

// ######################
// Конфигурация Api
// ######################
export const apiMesto = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: 'd709f1d7-61bc-4f4a-a795-fd13fa11ff95',
    'Content-Type': 'application/json',
  },
  paths: {
    user: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    likes: '/cards/likes',
  },
});

// ######################
// Конфигурация карточек
// ######################
function getNewCard(cardObject) {
  const cardMesto = new Card(cardObject, {
    template: '#templateCard',
    cardEls: {
      image: '.element__image',
      caption: '.element__caption',
      counter: '.element__likes-counter',
      delButton: '.element__button-del',
      like: '.element__button-like',
      likeActive: 'element__button-like_type_active',
      likeLoad: 'element__button-like_type_load',
    },
    backendKeys: {
      image: 'link',
      caption: 'name',
      counter: 'likes',
      id: '_id',
      owner: 'owner',
    },
    sockets: {
      userId: userMesto.userInfo.id,
      openImage: (image, caption) => popupImage.openPopup(image, caption),
      deleteImage: (cardId, that) => popupDelCard.openPopup(cardId, that),
      likeRequest: function (idCard, method) {
        // используем декларативное объявление функции
        // стрелочная функция теряет контекст!
        // запрос на сервер
        apiMesto
          .workData({ key: 'likes', id: idCard }, method)
          .then((res) => {
            const cardObject = res;
            // если всё ок, вносим данные
            cardMesto.setLikes(cardObject.likes.length);
          })
          .catch((err) => {
            cardMesto.errLikes(err);
          });
      },
    },
  });

  return cardMesto.getCard();
}

// ######################
// Конфигурация FormValidator
// ######################
const formsValidator = {
  image: new FormValidator('[name="addImage"]'),
  avatar: new FormValidator('[name="changeAvatar"]'),
  profile: new FormValidator('[name="editInfo"]'),
};

// ######################
// Конфигурация секции
// ######################
const cardSection = new Section(
  {
    items: [],
    renderer: (cardObject) => getNewCard(cardObject),
  },
  '.elements__grid'
);

// ######################
// Конфигурация UserInfo
// ######################
const userMesto = new UserInfo();

// ######################
// Конфигурация модальных окон
// ######################
const popupEditProfile = new PopupSubmit(
  '#popup-profile',
  function (evt, body) {
    apiMesto
      .workData({ key: 'user' }, 'patch', body)
      .then((userData) => {
        userMesto.userInfo = userData;
        popupEditProfile.succeedSubmit();
      })
      .catch((err) => {
        console.log(err);
        popupEditProfile.errSubmit(err);
      });
  },
  ['Переписываем', 'Исправляем', 'Меняем']
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupSubmit('#popup-add', async function (evt, body) {
  return apiMesto
    .workData({ key: 'cards' }, 'post', body)
    .then((res) => {
      cardSection.addItem(getNewCard(res));

      evt.target.reset();
      formsValidator.image.toggleButton();
      popupAddImage.succeedSubmit();
    })
    .catch((err) => {
      console.log(err);
      popupAddImage.errSubmit(err);
    });
});
popupAddImage.setEventListeners();

const popupEditAvatar = new PopupSubmit('#popup-avatar', async function (
  evt,
  body
) {
  return apiMesto
    .workData({ key: 'avatar' }, 'patch', body)
    .then((userData) => {
      userMesto.userInfo = userData;

      evt.target.reset();
      formsValidator.avatar.toggleButton();
      popupEditAvatar.succeedSubmit();
    })
    .catch((err) => {
      console.log(err);
      popupEditAvatar.errSubmit(err);
    });
});
popupEditAvatar.setEventListeners();

const popupImage = new PopupImage('#popup-image');
popupImage.setEventListeners();

const popupDelCard = new PopupDelete(
  '#popup-delCard',
  async function () {
    return apiMesto
      .workData({ key: 'cards', id: popupDelCard.cardIdToDelete }, 'delete')
      .then((res) => {
        popupDelCard.cardContext.removeCard();
        popupDelCard.succeedSubmit();
      })
      .catch((err) => {
        console.log(err);
        popupDelCard.errSubmit(err);
      });
  },
  ['Стираем', 'Удаляем', 'Забываем']
);
popupDelCard.setEventListeners();

// #####################
// Инициализация функций
// #####################

// Заполняем сайт данными с сервера£
Promise.all([
  apiMesto.workData({ key: 'user' }),
  apiMesto.workData({ key: 'cards' }),
])
  .then((initial) => {
    userMesto.userInfo = initial[0];

    cardSection.items = initial[1];
    cardSection.addArray();
  })
  .catch((err) => {
    console.log(err);
  });

// Запуск валидации на всех формах
formsValidator.image.enableValidation();
formsValidator.avatar.enableValidation();
formsValidator.profile.enableValidation();

// Подключение событий клика на кнопки
avatarWrapper.addEventListener('click', () => {
  // Устанавливаем адрес аватара в поля ввода
  inputAvatarUrl.value = userMesto.userInfo.avatar;
  popupEditAvatar.openPopup();
});

buttonAddImage.addEventListener('click', () => {
  popupAddImage.openPopup();
});

buttonEditProfile.addEventListener('click', () => {
  const evtInput = new Event('input');

  // Устанавливаем данные пользователя в поля ввода
  inputProfile.name.value = userMesto.userInfo.name;
  inputProfile.subtitle.value = userMesto.userInfo.subtitle;
  popupEditProfile.openPopup();
  // запускаем событие ввода данных на заполненных полях, для сброса валидации
  // если модальное окно было очищено вручную от данных и закрыто без сохранения
  inputProfile.name.dispatchEvent(evtInput);
  inputProfile.subtitle.dispatchEvent(evtInput);
});
