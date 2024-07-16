export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
    // ".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    // ".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    //     //get card view

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardElement.querySelector(".card__title").textContent = this.name;
    //set evt listeners
    this._setEventListeners();
    //return card
    return this._cardElement;
  }
}
