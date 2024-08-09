import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._modalForm.querySelectorAll(".modal__input")];
    this._saveButton = this._modalForm.querySelector(".modal__button");
  }

  confirmDelete(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
