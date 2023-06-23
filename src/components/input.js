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
    // !!!!!!!!!!!!!!!!!!!!!!!!!
    // возможно тут есть какая-то ошибка
    // Загружал картинку и получил 404 ошибку от сервера
    // загрузил другую, но надпись на кнопке не исчезла
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
