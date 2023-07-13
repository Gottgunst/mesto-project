// ######################
// Конфигурация элементов
// ######################

// Данные пользователя
export const avatarWrapper = document.querySelector('.profile__avatar-wrapper');

// Формы
export const inputProfile = {
  name: document.querySelector('.popup__form[name="editInfo"] >.popup__field[name="name"]'),
  subtitle: document.querySelector('.popup__form[name="editInfo"] >.popup__field[name="about"]'),
};

export const inputAvatarUrl = document.querySelector('.popup__form[name="changeAvatar"] > .popup__field[name="avatar"]');

// Кнопки
export const buttonEditProfile = document.querySelector('.profile__button_type_edit');
export const buttonAddImage = document.querySelector('.profile__button_type_add');
