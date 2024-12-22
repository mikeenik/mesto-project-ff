import "./styles/index.css";
import { initialCards } from "./cards.js";
import {
  openPopup,
  closePopup,
  closePopupByEsc,
  closePopupByOverlayClick,
} from "./components/modal.js";
import { createCard } from "./components/card.js";
import logoImage from "./images/logo.svg";
import avatarImage from "./images/avatar.jpg";
import addIcon from "./images/add-icon.svg";
import editIcon from "./images/edit-icon.svg";
import deleteIcon from "./images/delete-icon.svg";
import likeActive from "./images/like-active.svg";
import likeInactive from "./images/like-inactive.svg";
import closeIcon from "./images/close.svg";

const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  placesList.append(card);
});

document.addEventListener("keydown", closePopupByEsc);
document.addEventListener("click", closePopupByOverlayClick);

const editProfilePopup = document.querySelector(".popup_type_edit");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const closeButton = editProfilePopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(
  ".profile__description"
);
const editProfilePopupForm = editProfilePopup.querySelector(".popup__form");

function handleEditProfileSubmitForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  editProfilePopup.classList.remove("popup_is-opened");
}

editProfileButton.addEventListener("click", () => openPopup(editProfilePopup));
closeButton.addEventListener("click", () => closePopup(editProfilePopup));
editProfilePopupForm.addEventListener("submit", handleEditProfileSubmitForm);

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const closeAddСardPopupButton = addCardPopup.querySelector(".popup__close");
const placeNameCardInput = document.querySelector(
  ".popup__input_type_card-name"
);
const linkCardInput = document.querySelector(".popup__input_type_url");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");

function handleAddCardSubmitForm(evt) {
  evt.preventDefault();

  const newCardData = {
    link: linkCardInput.value,
    name: placeNameCardInput.value,
  };

  const newCard = createCard(newCardData);
  placesList.prepend(newCard);

  addCardPopup.classList.remove("popup_is-opened");
}

addCardButton.addEventListener("click", () => openPopup(addCardPopup));
closeAddСardPopupButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);
addCardPopupForm.addEventListener("submit", handleAddCardSubmitForm);

const cardPopup = document.querySelector(".popup_type_image");
const cardTitlePopup = cardPopup.querySelector(".popup__caption");
const cardImagePopup = cardPopup.querySelector(".popup__image");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");

function openCardPopup(evt) {
  const cardImage = evt.target.closest(".card__image");

  if (cardImage) {
    const card = cardImage.closest(".card");
    const cardTitle = card.querySelector(".card__title").textContent;

    cardTitlePopup.textContent = cardTitle;
    cardImagePopup.src = cardImage.src;
    cardImagePopup.alt = cardTitle;

    openPopup(cardPopup);
  }
}

placesList.addEventListener("click", openCardPopup);
closeCardPopupButton.addEventListener("click", () => closePopup(cardPopup));
