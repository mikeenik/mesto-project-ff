import "./styles/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import {
  getUserData,
  сhangeUserData,
  changeUserPhoto,
  getCardsData,
  addNewCard,
  deleteCard,
  addLikeOnCard,
  removeLikeOnCard,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");

function handleOpenCard(evt) {
  const cardImage = evt.target.parentElement.querySelector(".card__image");

  if (cardImage) {
    const card = cardImage.closest(".card");
    const cardTitle = card.querySelector(".card__title").textContent;

    cardTitlePopup.textContent = cardTitle;
    cardImagePopup.src = cardImage.src;
    cardImagePopup.alt = cardTitle;

    openPopup(cardPopup);
  }
}

getCardsData().then((cards) => {
  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      handleLikeCard,
      handleDeleteCard,
      handleOpenCard,
      currentUserId
    );
    placesList.append(card);
  });
});

const editProfilePopup = document.querySelector(".popup_type_edit");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const closeButtonEditProfilePopup =
  editProfilePopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfilePopupForm = editProfilePopup.querySelector(".popup__form");
const saveProfileDataButton = editProfilePopup.querySelector(".popup__button");
const profileImage = document.querySelector(".profile__image");

let currentUserId;

getUserData().then((data) => {
  currentUserId = data._id;
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
});

function handleEditProfileSubmitForm(evt) {
  evt.preventDefault();

  const updatedData = {
    name: profileNameInput.value,
    about: profileDescriptionInput.value,
  };

  saveProfileDataButton.textContent = "Сохранение...";

  сhangeUserData(updatedData.name, updatedData.about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления данных пользователя: ${err}`);
    })
    .finally(() => {
      saveProfileDataButton.textContent = "Сохранить";
    });
}

editProfileButton.addEventListener("click", () => {
  clearValidation(editProfilePopupForm, validationConfiguration);
  openPopup(editProfilePopup);
});
closeButtonEditProfilePopup.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
editProfilePopupForm.addEventListener("submit", handleEditProfileSubmitForm);

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const placeNameCardInput = document.querySelector(
  ".popup__input_type_card-name"
);
const linkCardInput = document.querySelector(".popup__input_type_url");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");
const saveCardDataButton = addCardPopup.querySelector(".popup__button");
const closeButtonCardPopup = addCardPopup.querySelector(".popup__close");

function handleAddCardSubmitForm(evt) {
  evt.preventDefault();

  const cardName = placeNameCardInput.value;
  const cardLink = linkCardInput.value;

  saveCardDataButton.textContent = "Сохранение...";

  addNewCard(cardName, cardLink)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        handleLikeCard,
        handleDeleteCard,
        handleOpenCard
      );
      placesList.prepend(newCard);
      closePopup(addCardPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      saveCardDataButton.textContent = "Сохранить";
    });
}

saveCardDataButton.addEventListener("click", () => closePopup(addCardPopup));
addCardButton.addEventListener("click", () => {
  clearValidation(addCardPopupForm, validationConfiguration);
  openPopup(addCardPopup);
});
addCardPopupForm.addEventListener("submit", handleAddCardSubmitForm);
closeButtonCardPopup.addEventListener("click", () => closePopup(addCardPopup));

const editProfileAvatarPopup = document.querySelector(
  ".popup_type_edit_avatar"
);
const editAvatarInput = editProfileAvatarPopup.querySelector(
  ".popup__input_type_url_avatar"
);
const closeButtonEditProfileAvatarPopup =
  editProfileAvatarPopup.querySelector(".popup__close");
const saveProfileNewAvatar =
  editProfileAvatarPopup.querySelector(".popup__button");
const profileImageContainer = document.querySelector(
  ".profile_image__container"
);

profileImageContainer.addEventListener("click", () => {
  editAvatarInput.value = "";
  clearValidation(profileForm, validationConfiguration);
  openPopup(editProfileAvatarPopup);
});

function handleEditProfileAvatar(evt) {
  evt.preventDefault();

  const avatarUrl = editAvatarInput.value;
  saveProfileNewAvatar.textContent = "Сохранение...";

  changeUserPhoto(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(editProfileAvatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка изменения аватара: ${err}`);
    })
    .finally(() => {
      saveProfileNewAvatar.textContent = "Сохранить";
    });
}

editProfileAvatarPopup.addEventListener("submit", handleEditProfileAvatar);
closeButtonEditProfileAvatarPopup.addEventListener("click", () =>
  closePopup(editProfileAvatarPopup)
);

const cardPopup = document.querySelector(".popup_type_image");
const cardTitlePopup = cardPopup.querySelector(".popup__caption");
const cardImagePopup = cardPopup.querySelector(".popup__image");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");

closeCardPopupButton.addEventListener("click", () => closePopup(cardPopup));

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

const profileForm = document.querySelector(".popup__form");
const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

clearValidation(profileForm, validationConfiguration);
