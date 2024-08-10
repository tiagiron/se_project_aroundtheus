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
  changeAvatarButton,
  changeAvatarForm,
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
  headers: {
    authorization: "ea161ff4-cda4-4a20-a8db-64fec38336d8",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    user.setUserInfo({
      name: userData.name,
      bio: userData.about,
    });
    user.changeAvatarImage(userData.avatar);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(`Failed to load app info: ${err}`);
  });

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
    newCardModal.renderLoading(true);
    api
      .addCard({
        name: data.title,
        link: data.link,
      })
      .then((data) => {
        section.addItem(createCard(data));
        newCardModal.close();
      })
      .catch(console.error)
      .finally(() => {
        newCardModal.renderLoading(false);
      });
  },
});

const editProfileModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    editProfileModal.renderLoading(true);
    api
      .editProfile({
        name: data.title,
        about: data.bio,
      })
      .then((data) => {
        user.setUserInfo({ name: data.name, bio: data.about });
        editProfileModal.close();
      })
      .catch(console.error)
      .finally(() => {
        editProfileModal.renderLoading(false);
      });
  },
});

const confirmDeleteModal = new ModalWithForm({
  modalSelector: "#confirm-delete-modal",
  handleFormSubmit: confirmDeleteCard,
});

const changeAvatarModal = new ModalWithForm({
  modalSelector: "#change-avatar-modal",
  handleFormSubmit: (data) => {
    changeAvatarModal.renderLoading(true);
    api
      .changeAvatar(data.link)
      .then((userData) => {
        user.changeAvatarImage(userData.avatar);
        changeAvatarModal.close();
      })
      .catch(console.error)
      .finally(() => {
        changeAvatarModal.renderLoading(false);
      });
  },
});

const imageModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  bio: ".profile__bio",
  avatar: ".profile__avatar",
});

// //initialize instances

imageModal.setEventListeners();
newCardModal.setEventListeners();
editProfileModal.setEventListeners();
confirmDeleteModal.setEventListeners();
changeAvatarModal.setEventListeners();

// /* Validation */

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const changeAvatarFormValidator = new FormValidator(settings, changeAvatarForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

// /* Functions */

function createCard(data) {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imageModal.open(data);
      },
      handleLikeClick: (card) => {
        api
          .likeCardStatus(card.getId(), !card._isLiked)
          .then((data) => {
            card.handleLike(data.isLiked);
          })
          .catch(console.error);
      },
      handleDeleteCardClick: confirmDeleteCard,
    },
    cardSelectors.cardTemplate,
  );
  return card.getView();
}

function confirmDeleteCard(cardData) {
  confirmDeleteModal.open();
  confirmDeleteModal.setSubmitHandler(() => {
    api
      .deleteCard(cardData.getId())
      .then(() => {
        cardData.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch(console.error);
  });
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileBioInput.value = userInput.bio;
  editProfileModal.open();
  editFormValidator.resetValidation();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
  addFormValidator.resetValidation();
});

changeAvatarButton.addEventListener("click", () => {
  changeAvatarModal.open();
  changeAvatarFormValidator.resetValidation();
});
