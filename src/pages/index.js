import "../pages/index.css";

//imports

import {
  cardSelectors,
  settings,
  profileEditButton,
  profileTitleInput,
  profileBioInput,
  profileEditForm,
  addCardButton,
  addCardForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/API.js";

//API
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  authToken: "ea161ff4-cda4-4a20-a8db-64fec38336d8",
});

api.getUserInfo().then((userData) =>
  user.setUserInfo({
    name: userData.name,
    bio: userData.about,
  }),
);

api
  .getInitialCards()
  .then((cards) => {
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

// api.getAppInfo().then(([getUserInfo, getInitialCards]) => {

//instantiate
const section = new Section(
  {
    renderer: (data) => {
      section.addItem(createCard(data));
    },
  },
  cardSelectors.cardListEl,
);

const newCardModal = new ModalWithForm({
  modalSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    console.log("data:", data);
    api
      .addCard({
        name: data.title,
        link: data.link,
      })
      .then((data) => {
        section.addItem(createCard(data));
      });
  },
});

const editProfileModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    console.log("data:", data);
    api
      .editProfile({
        name: data.title,
        about: data.bio,
      })
      .then((data) => {
        user.setUserInfo({ data });
      })
      .catch((err) => {
        console.error(err);
      });
  },
});

// function handleProfileEditFormSubmit(profileData) {
//   const name = profileData.title;
//   const bio = profileData.bio;
//   user.setUserInfo({ name, bio });
//   editProfileModal.close();
// }

/* function handleAddCardFormSubmit(newCardData) {
  console.log(newCardData);
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.link;
  section.addItem(createCard({ name, alt, link }));
  newCardModal.close();
}*/

const imageModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  bio: ".profile__bio",
});

// //initialize instances

imageModal.setEventListeners();
newCardModal.setEventListeners();
editProfileModal.setEventListeners();

// /* Validation */

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// /* Functions */

function createCard(data) {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imageModal.open(data);
      },
      handleDeleteCardClick: () => {
        const id = card.getID();
        api.deleteCard(id).then(() => {
          card.handleDeleteCard();
        });
      },
    },
    cardSelectors.cardTemplate,
  );
  return card.getView();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileBioInput.value = userInput.bio;
  editProfileModal.open();
  editFormValidator.toggleButtonState();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
  addFormValidator.resetValidation();
});
