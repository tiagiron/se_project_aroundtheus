export const cardSelectors = {
  cardListEl: ".cards__list",
  cardTemplate: "#card-template",
  previewModal: "#card-image-modal",
};

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditButton = document.querySelector(
  ".profile__edit-button",
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileBioInput = document.querySelector("#profile-bio-input");
export const profileEditForm = document.forms["profile-edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardForm = document.forms["add-card-form"];
export const changeAvatarButton = document.querySelector(
  ".profile__avatar-edit-button",
);
export const changeAvatarForm = document.forms["change-avatar-form"];
