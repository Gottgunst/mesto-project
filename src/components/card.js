// ##########################
// Image Card Class
// ##########################

export default class Card {
  constructor(cardObject, {template, cardEls, backendKeys, sockets},
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

    // привязка к внешним функциям
    this._sockets = sockets;

    // объявляем переменную для Id анимации — чтобы её остановить
    this._stopAnimation;
  }
  // явный метод получения карточки
  getCard(){
    return this._gather();
  }

  // удаляем карточку
  removeCard(){
      // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;

    document.getElementById(obj[key.id]).remove();
  }

  // собираем карточку
  _gather(){
    const { _cardElement, _caption, _image, _counter } = this;

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
      if(obj[key.counter].some(user => user[key.id] === this._sockets.userId))
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

    const method = this._like.classList.contains(this._cardEls.likeActive) ? 'delete' : 'put';

    this._stopAnimation = this._loadLikeAnimation();

    // отправляем в коллбек данные для лайка с привязкой контекста
    this._sockets.likeRequest.call(this, obj[key.id], method);
  }

  setLikes(likesQuantity){
    // останавливаем Анимацию
    this._loadLikeAnimation(this._stopAnimation);
    // меняем сиконку лакйка
    this._like.classList.toggle(this._cardEls.likeActive);
    // рисуем кол-во лайков
    this._counter.textContent = likesQuantity>0 ? likesQuantity : "";
  }

  errLikes(err){
    console.log(err);
    this._loadLikeAnimation(this._stopAnimation);
  }


  // устанавливаем события
  _addEvents(){
    const { _sockets, _image, _delButton, _like } = this;
    // переменные для данных с сервера
    const obj = this._cardObject;
    const key = this._backendKeys;
    // Биндим функции для передачи их по клику
    const bindLikeCard = this._likeCard.bind(this);

    _image.addEventListener('click',
      ()=>_sockets.openImage(obj[key.image],obj[key.caption]));

    _like.addEventListener('click', bindLikeCard);

    // если карточка не наша, её нет возможности удалить
    obj[key.owner][key.id] === _sockets.userId ?
      _delButton.addEventListener('click', () => _sockets.deleteImage(obj[key.id], this)) :
      _delButton.remove();
  }

  // Индикация обработки данных
  _loadLikeAnimation(intervalId) {
    if(!intervalId){
      let index = 0;
      let opacity=[1, .9, .8, .7, .6, .5, .4, .3];

      this._like.classList.add(this._cardEls.likeLoad);
      // возвращаем ID для его отключения
      return setInterval(()=>{

        this._like.style.opacity = opacity[index];

        // двигаемся по массиву значений, в обоих направлениях
        if(index<opacity.length-1){
          index++;
        }else{
          opacity.reverse();
          index=0;
        }
      }, 50);
    } else {
      // останавливаем анимацию и возвращаем label
      clearInterval(intervalId);
      // меняем удаляем временные стили
      this._like.classList.remove(this._cardEls.likeLoad);
      this._like.removeAttribute('style');
    }
  }
}


