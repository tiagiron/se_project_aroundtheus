export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this._modalElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._modalElement.addEventListener("click", (evt) => {
      if (evt.target === this._modalElement) {
        this.close();
      }
    });
  }
}
