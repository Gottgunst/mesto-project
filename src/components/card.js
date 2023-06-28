// ##########################
// Image Card Class
// ##########################

export default class Card {
  constructor(cardObject, {template, cardEls, backendKeys, fn},
    ){
    // Объект карточки с сервера
    this._cardObject = cardObject;
    // Шаблон карточки из HTML
    this._template = template;
    // Селекторы элементов карточки
    this._cardEls = cardEls;
    // Ключи объектов бекэнда
    this._backendKeys = backendKeys;
    // привязка к внешним функциям
    this._fn = fn;
    // возвращаем при вызове класса
    // результат работы внутренней функции,
    // но ломаем внешние методы
    return this._gather();
  }
  // явный метод получения карточки
  // getCard(){
  //   return this._gather();
  // }

  // собираем карточку
  _gather(){
    // клонируем разметку
    const cardElement = document.querySelector(this._template).content.cloneNode(true);

    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;
    // переменная для селекторов элементов карточки
    const el = this._cardEls;

    // находим в разметке элементы
    const image = cardElement.querySelector(el.image);
    const caption = cardElement.querySelector(el.caption);
    const counter = cardElement.querySelector(el.counter);
    const delButton = cardElement.querySelector(el.delButton);
    const like = cardElement.querySelector(el.like);

    // присваиваем:
    // — id карточке
    cardElement.firstChild.id = obj[key.id];
    // — заголовок
    caption.textContent = obj[key.caption];
    // — изображение
    image.src = obj[key.image];
    image.alt = obj[key.caption];
    // — кол-во лайков + проверка на свой лайк
    counter.textContent = this._checkLikes(obj, key, like, el);

    // назначение событий клика
    this._addEvents(image, like, delButton, obj, key, this._fn);

    return cardElement;
  }

  // проверяем кол-во лайков
  _checkLikes(obj, key, like, { likeActive }){
    if(obj[key.counter].length>0) {
      // проверка личного лайка
      if(obj[key.counter].some(user => user[key.id] === window.userData[key.id]))
        like.classList.add(likeActive);

      // возвращаем кол-во лайков
      return obj[key.counter].length;
    }
    // возвращаем пусто, если нет лайков
    return "";
  }

  // устанавливаем события
  _addEvents(image, like, delButton, obj, key, fn){

    image.addEventListener('click',
      ()=>fn.open(obj[key.image],obj[key.caption]));

    like.addEventListener('click',
      (evt)=>fn.like(evt));

    // если карточка не наша, её нет возможности удалить
    obj[key.owner][key.id] === window.userData[key.id] ?
      delButton.addEventListener('click',(evt)=>fn.del(evt)) :
      delButton.remove();
  }
}


