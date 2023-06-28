import { mestoApi } from '../page/index.js';

// ######################
// Button Like Function
// ######################

export function likeCard(evt) {
  const card = evt.target.closest('.element__wrapper');
  const method = evt.target.classList.toggle('element__button-like_active') ? 'put': 'delete';

  mestoApi.workData({key : 'likes', id : card.id}, method)
  .then((res)=>{
    const cardObject = res;
    card.querySelector('.element__likes-counter').textContent = cardObject.likes.length>0 ? cardObject.likes.length : "";
  })
  .catch((err)=>{
    console.log(err);
  });

}
