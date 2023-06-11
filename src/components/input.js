import { loadStatusButton } from './buttons.js';
import { closePopup, openPopup } from './modal.js';

// ########################
// Универсальный обработчик submit
// ########################

export function handleSubmit(evt, button, request, labelArray=undefined ){
  evt.preventDefault();

  const label = button.textContent;
  const stop = labelArray ? loadStatusButton(button, labelArray) : loadStatusButton(button);

  request()
  .then((res)=>{
    closePopup();
    loadStatusButton(button, [label], stop);
  })
  .catch((err)=>{
    console.log(err);
    loadStatusButton(button, [`Ошибка: ${err.status}`], stop);
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
