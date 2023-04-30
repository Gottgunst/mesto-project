// ######################
// Button Like function
// ######################

export function imageLike(evt) {
 evt.target.classList.toggle('element__button-like_active');
}

// ######################
// Button Del function
// ######################

export function imageDel(evt) {
  if (evt.target.closest('li').querySelector('.element__button-like_active')) {
    if (confirm('Вы удаляете любимую фотографию?')){
      evt.target.closest('li').remove();
    }
  }
  else {
    evt.target.closest('li').remove();
  }
}
