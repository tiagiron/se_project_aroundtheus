import "../pages/index.css";

//imports

import { initialCards, cardSelectors, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//constants
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__bio");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileBioInput = document.querySelector("#profile-bio-input");
const profileEditForm = document.forms["profile-edit-form"];
const addCardButton = document.querySelector(".profile__add-button");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardModal = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardLinkInput = document.querySelector(".modal__input_type_link");
const addCardForm = document.forms["add-card-form"];
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalImage = document.querySelector("#modal-image");
const cardImageModalTitle = document.querySelector("#modal-title");
const closeButtons = document.querySelectorAll(".modal__close");

//instantiate
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
    cardListEl,
  },

  cardSelectors.cardListEl,
);

const newCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
);

const editProfileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit,
);

const cardPreviewModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  bio: ".profile__bio",
});

//initialize instances
section.renderItems(initialCards);
cardPreviewModal.setEventListeners();
newCardModal.setEventListeners();
editProfileModal.setEventListeners();

/* Validation */

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* Functions */

// renderer: (data) => {
//   const cardEl = new Card(
//     {
//       data,
//       handleImageClick: (imageData) => {
//         CardPreviewModal.open(imageData);
//       },
//     },
//     cardSelectors.cardTemplate,
//   );
//   cardListEl.addItem(cardEl.getView());
// };

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

const renderCard = (cardData, cardListEl) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
};

/* Event Handlers */

function handleImageClick(cardData) {
  cardPreviewModal.open(cardData);
}

function handleProfileEditFormSubmit() {
  const inputValues = editProfileModal._getInputValues();
  user.setUserInfo({
    name: inputValues.profileTitleInput,
    bio: inputValues.profileBioInput,
  });
  editProfileModal.close();
}

function handleAddCardFormSubmit(newCardData, cardListEl) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  section.addItem(createCard({ name, alt, link }));
  newCardModal.close();
  addFormValidator.resetForm();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileBioInput.value = userInput.bio;
  editProfileModal.open();
  editFormValidator.toggleButtonState();
});

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

addCardButton.addEventListener("click", () => newCardModal.open());

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });
