// LIKE buttons function

const buttonsLike = document.querySelectorAll('.element__button-like');

buttonsLike.forEach(button =>
  button.addEventListener('click', imageLike)
);

function imageLike(evt) {
 evt.target.classList.toggle('element__button-like_active');
}
