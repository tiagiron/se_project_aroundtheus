import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalCardImage = this._modalElement.querySelector("#modal-image");
    this._modalCardTitle = this._modalElement.querySelector("#modal-title");
  }

  open({ name, link }) {
    this._modalCardImage.src = link;
    this._modalCardImage.alt = name;
    this._modalCardTitle.textContent = name;
    super.open();
  }
}
