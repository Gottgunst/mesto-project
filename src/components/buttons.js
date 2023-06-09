import { path, workData } from './api';

// ######################
// Button Like Function
// ######################

export async function likeCard(evt) {
  const card = evt.target.closest('.element__wrapper');
  const method = evt.target.classList.toggle('element__button-like_active') ? 'put': 'delete';

  const cardObject = await workData(`${path.likes}/${card.id}`, method);

  card.querySelector('.element__likes-counter').textContent = cardObject.likes.length>0 ? cardObject.likes.length : "";
}

// ######################
// Button Del Function
// ######################

export function delCard(card) {
  card.remove();
  workData(`${path.cards}/${card.id}`, 'delete');
}

// #################
// Индикация обработки данных
// #################

export function loadStatusButton(button, intervalId) {
  if(!intervalId){
    let flag = 0;
    const textArr = [
      'Обрабатываем',
      'Сохраняем',
      'Выполняем',
      'Исполняем',
      'Загружаем',
      'Обновляем',
    ];
    const textId = Math.floor(Math.random() * textArr.length);
    // возвращаем ID для его отключения
    return setInterval(()=>{
        flag++;
        const dots = new Array(flag % 5).join('.');
        button.textContent = textArr[textId] + dots;
      }, 400);
  } else {
    button.textContent = button.getAttribute('data-text') || 'Сохранить';
    clearInterval(intervalId);
  }
}
