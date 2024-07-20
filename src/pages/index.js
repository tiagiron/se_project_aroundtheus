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
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleImageClick: () => {
            imageModal.open(data);
          },
        },
        cardSelectors.cardTemplate,
      );

      section.addItem(card.getView());
    },
  },
  cardSelectors.cardListEl,
);

// const newCardModal = new ModalWithForm(
//   "#add-card-modal",
//   handleAddCardFormSubmit,
// );

const editProfileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit,
);

const imageModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  bio: ".profile__bio",
});

// //initialize instances
section.renderItems(initialCards);
imageModal.setEventListeners();
// newCardModal.setEventListeners();
editProfileModal.setEventListeners();

// /* Validation */

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// /* Functions */

// function createCard(cardData) {
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   return card.getView();
// }

// const renderCard = (cardData, cardListEl) => {
//   const cardElement = createCard(cardData);
//   cardListEl.prepend(cardElement);
// };

// /* Event Handlers */

// function handleProfileEditFormSubmit() {
//   const inputValues = editProfileModal._getInputValues();
//   user.setUserInfo({
//     name: inputValues.profileTitleInput,
//     bio: inputValues.profileBioInput,
//   });
//   editProfileModal.close();
// }
function handleProfileEditFormSubmit(profileData) {
  const name = profileData.name;
  const bio = profileData.bio;
  user.setUserInfo({ name, bio });
  editProfileModal.close();
}

// function handleAddCardFormSubmit(cardData, cardListEl) {
//   const name = cardData.name;
//   const link = cardData.link;
//   section.addItem(createCard(cardData));
//   renderCard(cardData, cardListEl);
//   newCardModal.close();
//   addFormValidator.resetForm();
// }

// /* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileBioInput.value = userInput.bio;
  editProfileModal.open();
  editFormValidator.toggleButtonState();
});

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

// addCardButton.addEventListener("click", () => newCardModal.open());

// // addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// // initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// // closeButtons.forEach((button) => {
// //   const modal = button.closest(".modal");
// //   button.addEventListener("click", () => closeModal(modal));
// // });
