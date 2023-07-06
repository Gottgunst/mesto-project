// ##########################
// Image Card Class
// ##########################

export default class Card {
  constructor(cardObject, {template, cardEls, backendKeys, fn},
    ){
    // Объект карточки с сервера
    this._cardObject = cardObject;
    // Шаблон карточки из HTML
    // клонируем разметку
    this._cardElement = document.querySelector(template).content.cloneNode(true);

    // Селекторы элементов карточки
    this._cardEls = cardEls;

    // находим в разметке элементы
    this._image = this._cardElement.querySelector(cardEls.image);
    this._caption = this._cardElement.querySelector(cardEls.caption);
    this._counter = this._cardElement.querySelector(cardEls.counter);
    this._delButton = this._cardElement.querySelector(cardEls.delButton);
    this._like = this._cardElement.querySelector(cardEls.like);

    // Ключи объектов бекэнда
    this._backendKeys = backendKeys;

    // Биндим функцию для передачи её в колбек
    this._bindSetLikes = this._setLikes.bind(this);

    // привязка к внешним функциям
    this._fn = fn;
  }
  // явный метод получения карточки
  getCard(){
    return this._gather();
  }

  // собираем карточку
  _gather(){
    const { _cardElement, _caption, _image, _counter, _delButton, _like } = this;

    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;

    // присваиваем:
    // — id карточке
    _cardElement.firstChild.id = obj[key.id];
    // — заголовок
    _caption.textContent = obj[key.caption];
    // — изображение
    _image.src = obj[key.image];
    _image.alt = obj[key.caption];
    // — кол-во лайков + проверка на свой лайк
    _counter.textContent = this._checkLikes();

    // назначение событий клика
    this._addEvents();

    return _cardElement;
  }

  // проверяем кол-во лайков
  _checkLikes(){
    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;

    if(obj[key.counter].length>0) {
      // проверка личного лайка
      if(obj[key.counter].some(user => user[key.id] === window.userData[key.id]))
        this._like.classList.add(this._cardEls.likeActive);

      // возвращаем кол-во лайков
      return obj[key.counter].length;
    }
    // возвращаем пусто, если нет лайков
    return "";
  }

  _likeCard(){
    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;

    const method = this._like.classList.toggle(this._cardEls.likeActive) ? 'put': 'delete';

    // отправляем в коллбек данные для лайка
    this._fn.likeRequest(obj[key.id], method, this._bindSetLikes);
  }

  _setLikes(likesQuantity){
    // рисуем кол-во лайков
    this._counter.textContent = likesQuantity>0 ? likesQuantity : "";
  }

  // устанавливаем события
  _addEvents(){
    const { _fn, _image, _delButton, _like } = this;
    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;

    _image.addEventListener('click',
      ()=>_fn.open(obj[key.image],obj[key.caption]));

    _like.addEventListener('click',
      ()=>{this._likeCard()});

    // если карточка не наша, её нет возможности удалить
    obj[key.owner][key.id] === window.userData[key.id] ?
      _delButton.addEventListener('click',(evt)=>_fn.del(evt)) :
      _delButton.remove();
  }
}


