import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [
      ...this._modalSelector.querySelectorAll(".modal__input"),
    ];
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.data = this._getInputValues();
      this._handleFormSubmit(this.data);
      this._modalForm.reset();
    });
  }
}
