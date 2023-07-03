export default class UserInfo{
  constructor(profile, request){
    this._profile = profile;
    this._request = request;
  }
//метод возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api
//— подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет
// подставить в форму при открытии — метод вам пригодится.

  get userInfo(){
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile;

    return {
      name: nameProfile.textContent,
      subtitle: subtitleProfile.textContent,
      avatar: avatarProfile.src
    }
  }
  set userInfo(obj){
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile;

    nameProfile.textContent = obj.name;
    subtitleProfile.textContent = obj.about;
    avatarProfile.src = obj.avatar;
  }

    //метод принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
  workUserInfo(path, body) {
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile;

    return this._request(path, body)
    .then(({name, about, avatar})=>{
      nameProfile.textContent = name;
      subtitleProfile.textContent = about;
      avatarProfile.src = avatar;
    });
  }
}
