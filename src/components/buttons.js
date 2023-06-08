// ######################
// Button Like Function
// ######################

import { delData, pathConfig } from './api';

export function likeCard(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

// ######################
// Button Del Function
// ######################

export function delCard(evt) {
  if (evt.target.closest('.element__wrapper').querySelector('.element__button-like_active')) {
    if (confirm('Вы удаляете любимую фотографию?')){
      evt.target.closest('.element__wrapper').remove();
    }
  }
  else {
    evt.target.closest('.element__wrapper').remove();
  }

  delData(`${pathConfig.cardsPath}/${evt.target.closest('.element__wrapper').id}`);
}
