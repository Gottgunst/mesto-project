export default class UserInfo{
  constructor(profile, idProfile = null){
    this._profile = profile;
    this.idProfile = idProfile;
  }

// сеттер и геттер для данных пользователя
  get userInfo(){
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile;
    const {idProfile} = this

    return {
      name: nameProfile.textContent,
      subtitle: subtitleProfile.textContent,
      avatar: avatarProfile.src,
      _id: idProfile
    }
  }
  set userInfo(obj){
    const {nameProfile, subtitleProfile, avatarProfile } = this._profile;

    nameProfile.textContent = obj.name;
    subtitleProfile.textContent = obj.about;
    avatarProfile.src = obj.avatar;
    this.idProfile  = obj._id;
  }

// метод принимает новые данные пользователя от сервера и добавляет их на страницу.
  workUserInfo({name, about, avatar, _id}) {
    const {nameProfile, subtitleProfile, avatarProfile } = this._profile;

      nameProfile.textContent = name;
      subtitleProfile.textContent = about;
      avatarProfile.src = avatar;
      this.idProfile = _id;
  }
}
