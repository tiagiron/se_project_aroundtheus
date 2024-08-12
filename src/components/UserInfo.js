export default class UserInfo {
  constructor({ name, bio, avatar }) {
    this._name = document.querySelector(name);
    this._bio = document.querySelector(bio);
    this._avatar = document.querySelector(avatar);
  }

  changeAvatarImage(avatar) {
    this._avatar.src = avatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, bio }) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}
