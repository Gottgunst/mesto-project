// LIKE buttons function

const buttonsLike = document.querySelectorAll('.element__like-button');

buttonsLike.forEach((button, index) =>
  button.addEventListener('click', like)
);

function like(evt) {
 evt.target.classList.toggle('element__like-button_active');
}
