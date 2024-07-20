import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalCardImage = this._modalElement.querySelector("#modal-image");
    this._modalCardTitle = this._modalElement.querySelector("#modal-title");
  }

  open(data) {
    this._modalCardImage.src = data.link;
    this._modalCardImage.alt = data.name;
    this._modalCardTitle.textContent = data.name;
    super.open();
  }
}
