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
  authToken: "ea161ff4-cda4-4a20-a8db-64fec38336d8",
});

// api.getAppInfo().then(([userData, cards]) => {

// });

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
        user.setUserInfo({ name: data.name, bio: data.about });
      })
      .catch((err) => {
        console.error(err);
      });
  },
});

const confirmDeleteModal = new ModalWithForm({
  modalSelector: "#confirm-delete-modal",
  handleFormSubmit: confirmDeleteCard,
});

const changeAvatarModal = new ModalWithForm({
  modalSelector: "#change-avatar-modal",
  handleFormSubmit: (link) => {
    console.log("Link:", link);
    api
      .changeAvatar(link)
      .then((userData) => {
        user.changeAvatarImage(userData.avatar);
        changeAvatarModal.close();
      })
      .catch((err) => {
        console.error(err);
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
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteCardClick: confirmDeleteCard,
    },
    cardSelectors.cardTemplate,
  );
  return card.getView();
}

function confirmDeleteCard(cardData) {
  confirmDeleteModal.open();
  confirmDeleteModal.confirmDelete(() => {
    api
      .deleteCard(cardData.getId())
      .then(() => {
        cardData.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
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

changeAvatarButton.addEventListener("click", () => {
  changeAvatarModal.open();
  changeAvatarFormValidator.resetValidation();
});
