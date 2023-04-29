// LIKE buttons function

const buttonsLike = document.querySelectorAll('.element__button-like');

buttonsLike.forEach(button =>
  button.addEventListener('click', imageLike)
);

function imageLike(evt) {
 evt.target.classList.toggle('element__button-like_active');
}


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


export function newListener() {

}
