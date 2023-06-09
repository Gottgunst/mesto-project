import { path, workData } from './api.js';
import { delCard } from './buttons.js';
import { openPopup } from './modal.js';

// ########################
// Profile Form Data
// ########################

export async function handleProfileFormSubmit(profile, {form}) {

  const res = await workData(path.user, 'patch',
  {
    name: form.name.value,
    about: form.subtitle.value
  });

  profile.name.textContent = res.name;
  profile.subtitle.textContent = res.about;
}

// ########################
// Image Form Data
// ########################

export async function handleImageFormSubmit({form}) {
  return await workData(path.cards, 'post',
  {
    name: form.title.value,
    link: form.url.value,
  });
}

// ########################
// Avatar Form Data
// ########################

export async function handleAvatarFormSubmit({form}) {
  return await workData(path.avatar, 'PATCH', {
    avatar: form.urlAvatar.value
  });
}

// ########################
// Delete Card popup
// ########################

export function handleCardDelate(evt, popupDelCard){
  openPopup(popupDelCard.container);

  window.cardToDelete = evt.target.closest('.element__wrapper');

  if (evt.target.closest('.element__wrapper').querySelector('.element__button-like_active')){
    popupDelCard.title.textContent = 'Любимую карточку?';
    popupDelCard.button.textContent = 'Удалить';
  } else {
    popupDelCard.title.textContent = 'Вы уверены?'
    popupDelCard.button.textContent = 'Да';
  }

}
