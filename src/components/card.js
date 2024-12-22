const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData) {
  const cardFragment = cardTemplate.cloneNode(true);
  const cardElement = cardFragment.querySelector(".places__item");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeCard);

  return cardElement;
}

function handleDeleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
