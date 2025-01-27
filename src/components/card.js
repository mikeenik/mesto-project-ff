import { addLikeOnCard, removeLikeOnCard, deleteCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  handleLikeCard,
  handleDeleteCard,
  handleOpenCard,
  currentUserId
) {
  const cardFragment = cardTemplate.cloneNode(true);
  const cardElement = cardFragment.querySelector(".places__item");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  const cardId = cardData._id;

  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      handleDeleteCard(cardElement, cardId);
    });
  }
  likeButton.addEventListener("click", (evt) => {
    handleLikeCard(evt, cardId, likeCount);
  });
  cardImage.addEventListener("click", handleOpenCard);

  return cardElement;
}

export function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка удаления карты лайка: ${err}`);
    });
}

export function handleLikeCard(evt, cardId, likeCountElement) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const apiCall = isLiked ? removeLikeOnCard : addLikeOnCard;

  apiCall(cardId)
    .then((updatedCard) => {
      likeCountElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
    })
    .catch((err) => {
      console.error(`Ошибка изменения лайка: ${err}`);
    });
}