// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardFragment = cardTemplate.cloneNode(true);

  const cardElement = cardFragment.querySelector(".places__item");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", deleteCard);

  // @todo: Функция удаления карточки
  function deleteCard(evt) {
    const listItem = evt.target.closest(".places__item");
    listItem.remove();
  }
  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  placesList.append(card);
});
