import { mestoApi } from "../page";
import { inputProfile } from "../utils/constants.js";


export default class UserInfo{
  constructor(profile){
    this._profile = profile
  }
//метод возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api
//— подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет
// подставить в форму при открытии — метод вам пригодится.

  getUserInfo(){
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile;

    return {
      name: nameProfile.textContent,
      subtitle: subtitleProfile.textContent,
      avatar: avatarProfile.src
    }
  }
    //метод принимает новые данные пользователя, отправляет их на серверНЕ СДЕЛАНО и добавляет их на страницу.
  setUserInfo(body, path = 'user') {
    console.log(path)
    const {nameProfile, subtitleProfile, avatarProfile} = this._profile
    console.log(path)

    return mestoApi.workData({key:path}, 'patch',
  body)
    .then(({name, about, avatar})=>{
      nameProfile.textContent = name;
      subtitleProfile.textContent = about;
      avatarProfile.src = avatar;
    })
  }
}
