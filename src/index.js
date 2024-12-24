import "./styles/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";

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

initialCards.forEach((cardData) => {
  const card = createCard(
    cardData,
    handleLikeCard,
    handleDeleteCard,
    handleOpenCard
  );
  placesList.append(card);
});

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
const profileDescription = document.querySelector(".profile__description");
const editProfilePopupForm = editProfilePopup.querySelector(".popup__form");
const saveProfileDataButton = editProfilePopup.querySelector(".popup__button");

function handleEditProfileSubmitForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editProfilePopup);
  evt.target.reset();
}

editProfileButton.addEventListener("click", () => openPopup(editProfilePopup));
closeButton.addEventListener("click", () => closePopup(editProfilePopup));
editProfilePopupForm.addEventListener("submit", handleEditProfileSubmitForm);

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const placeNameCardInput = document.querySelector(
  ".popup__input_type_card-name"
);
const linkCardInput = document.querySelector(".popup__input_type_url");
const addCardPopupForm = addCardPopup.querySelector(".popup__form");
const saveCardDataButton = addCardPopup.querySelector(".popup__button");

function handleAddCardSubmitForm(evt) {
  evt.preventDefault();

  const newCardData = {
    link: linkCardInput.value,
    name: placeNameCardInput.value,
  };

  const newCard = createCard(
    newCardData,
    handleLikeCard,
    handleDeleteCard,
    handleOpenCard
  );
  placesList.prepend(newCard);
  closePopup(addCardPopup);
  evt.target.reset();
}

saveCardDataButton.addEventListener("click", () => closePopup(addCardPopup));
addCardButton.addEventListener("click", () => openPopup(addCardPopup));
addCardPopupForm.addEventListener("submit", handleAddCardSubmitForm);

const cardPopup = document.querySelector(".popup_type_image");
const cardTitlePopup = cardPopup.querySelector(".popup__caption");
const cardImagePopup = cardPopup.querySelector(".popup__image");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");

closeCardPopupButton.addEventListener("click", () => closePopup(cardPopup));
