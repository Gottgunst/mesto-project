import { mestoApi } from '../utils/constants';


// ######################
// Button Like Function
// ######################

export function likeCard(evt) {
  const card = evt.target.closest('.element__wrapper');
  const method = evt.target.classList.toggle('element__button-like_active') ? 'put': 'delete';

  mestoApi.workData(['likes', card.id], method)
  .then((res)=>{
    const cardObject = res;
    card.querySelector('.element__likes-counter').textContent = cardObject.likes.length>0 ? cardObject.likes.length : "";
  })
  .catch((err)=>{
    console.log(err);
  });

}

// #################
// Индикация обработки данных
// #################

export function loadStatusButton(button, text=undefined, intervalId) {
  if(!intervalId){
    let flag = 0;
    const textArr = text || [
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
    clearInterval(intervalId);
    button.textContent = text;
  }
}
