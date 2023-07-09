// ######################
// Конфигурация элементов
// ######################

// Данные пользователя
export const userProfile = {
  nameProfile: document.querySelector('.profile__name'),
  subtitleProfile: document.querySelector('.profile__subtitle'),
  avatarProfile: document.querySelector('.profile__avatar'),
  avatarWrapperProfile: document.querySelector('.profile__avatar-wrapper'),
};

// Формы
export const inputProfile = {
  form: document.querySelector('.popup__form[name="editInfo"]'),
  name: document.querySelector('.popup__form[name="editInfo"] >.popup__field[name="name"]'),
  subtitle: document.querySelector('.popup__form[name="editInfo"] >.popup__field[name="about"]'),
  button: document.querySelector('.popup__form[name="editInfo"] > .popup__submit'),
};

export const inputImage = {
  form: document.querySelector('.popup__form[name="addImage"]'),
  title: document.querySelector('.popup__form[name="addImage"] >.popup__field[name="name"]'),
  url: document.querySelector('.popup__form[name="addImage"] >.popup__field[name="link"]'),
  button: document.querySelector('.popup__form[name="addImage"] > .popup__submit'),
};

export const inputAvatar = {
  form: document.querySelector('.popup__form[name="changeAvatar"]'),
  url: document.querySelector('.popup__form[name="changeAvatar"] > .popup__field[name="avatar"]'),
  button: document.querySelector('.popup__form[name="changeAvatar"] > .popup__submit'),
};

export const inputDelCard = {
  form: document.querySelector('.popup__form[name="delCard"]'),
  button: document.querySelector('.popup__form[name="delCard"] > .popup__submit'),
};

// Кнопки
export const buttonEditProfile = document.querySelector('.profile__button_type_edit');
export const buttonAddImage = document.querySelector('.profile__button_type_add');






