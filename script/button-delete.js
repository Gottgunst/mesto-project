// delete image card function
const buttonsDel = document.querySelectorAll('.element__button-del');

buttonsDel.forEach(button => button.addEventListener('click', imageDel));

function imageDel(evt) {
  if (evt.target.closest('li').querySelector('.element__button-like_active')) {
    if (confirm('Вы удаляете любимую фотографию?')){
      evt.target.closest('li').remove();
    }
  }
  else {
    evt.target.closest('li').remove();
  }
}
