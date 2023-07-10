export default class UserInfo{
  constructor(profileSelectors={
    name: '.profile__name',
    subtitle: '.profile__subtitle',
    avatar: '.profile__avatar',
  }){

    this._labelName = document.querySelector(profileSelectors.name);
    this._labelSubtitle = document.querySelector(profileSelectors.subtitle);
    this._imageAvatar = document.querySelector(profileSelectors.avatar);

    this._userName;
    this._userSubtitle;
    this._userAvatar;
    this._userId;
  }

// сеттер и геттер для данных пользователя
  get userInfo(){
    const {_userName, _userSubtitle, _userAvatar, _userId} = this;

    return {
      name: _userName,
      subtitle: _userSubtitle,
      avatar: _userAvatar,
      id: _userId
    }
  }

  set userInfo(obj){
    // Если есть новая информация используем, если нет, то сохраняем старую
    // использовать здесь деконструкцию this не получится
    // при установке новых значений потеряется контекст
    this._userName = obj.name ? obj.name : this._userName;
    this._userSubtitle = obj.about ? obj.about : this._userSubtitle;
    this._userAvatar = obj.avatar ? obj.avatar : this._userAvatar;
    this._userId = obj._id ? obj._id : this._userId;

    // загружаем информацию в HTML
    this._renderUserInfo();
  }

  // метод размещает новые данные на страницу
  _renderUserInfo() {
    const {_userName, _userSubtitle, _userAvatar} = this;

    this._labelName.textContent = _userName;
    this._labelSubtitle.textContent = _userSubtitle;
    this._imageAvatar.src = _userAvatar;
  }

}
