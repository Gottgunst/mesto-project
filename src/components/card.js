import { likeCard } from './buttons';
import { handleCardDelate } from './input';
import { openPopupImage } from './modal';

// ##########################
// Image Card Class
// ##########################

export class Card {
  constructor(cardObject, {template, cardEls, backendKeys, popups}){
    // Объект карточки с сервера
    this._cardObject = cardObject;
    // Шаблон карточки из HTML
    this._template = template;
    // Селекторы элементов карточки
    this._cardEls = cardEls;
    // Ключи объектов бекэнда
    this._backendKeys = backendKeys;
    // привязка к модальным окнам
    this._popups = popups;

    // возвращаем при вызове класса
    // результат работы внутренней функции,
    // но ломаем внешние методы
    return this._gather();
  }

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
    this._addEvents(image, like, delButton, obj, key, this._popups);

    return cardElement;
  }

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

  _addEvents(image, like, delButton, obj, key, popups){
    image.addEventListener('click', () => openPopupImage(obj, popups.open));
    like.addEventListener('click', likeCard);

    // если карточка не наша, её нет возможности удалить
    obj[key.owner][key.id] === window.userData[key.id] ?
      delButton.addEventListener('click', (evt)=> handleCardDelate(evt, popups.del)) :
      delButton.remove();
  }

}


// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой.


// ##########################
// Section Class
// ##########################

export class Section{
  constructor({ items, renderer}, container){
    this.items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addArray(way='append'){
    const {items, _renderer, _container} = this;

    items.forEach((item)=>{
      _container[way](_renderer(item));
    });
  }

  addItem(item, way='prepend'){
    this._container[way](item);
  }
}
