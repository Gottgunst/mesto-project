// Delete card
const buttonsDel = document.querySelectorAll('.element__button-del');

buttonsDel.forEach(button => button.addEventListener('click', imageDel));

function imageDel(evt) {
  evt.target.closest('li').remove();
}
