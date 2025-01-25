const requestConfiguration = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-30",
  headers: {
    authorization: "862c22fe-fcd9-4bbf-9c6f-5c11db01764c",
    "Content-Type": "application/json",
  },
};

const checkRequest = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${requestConfiguration.baseUrl}/users/me`, {
    headers: requestConfiguration.headers,
  }).then((res) => checkRequest(res));
};

export const сhangeUserData = (userNameInput, userJobTitleInput) => {
  return fetch(`${requestConfiguration.baseUrl}/users/me`, {
    method: "PATCH",
    headers: requestConfiguration.headers,
    body: JSON.stringify({
      name: userNameInput,
      about: userJobTitleInput,
    }),
  }).then((res) => checkRequest(res));
};

export function changeUserPhoto(avatar) {
  return fetch(`${requestConfiguration.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: requestConfiguration.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => checkRequest(res));
}

export const getCardsData = () => {
  return fetch(`${requestConfiguration.baseUrl}/cards`, {
    headers: requestConfiguration.headers,
  }).then((res) => checkRequest(res));
};

export const addNewCard = (cardNameInput, cardImgLinkInput) => {
  return fetch(`${requestConfiguration.baseUrl}/cards`, {
    method: "POST",
    headers: requestConfiguration.headers,
    body: JSON.stringify({
      name: cardNameInput,
      link: cardImgLinkInput,
    }),
  }).then((res) => checkRequest(res));
};

export function deleteCard(cardId) {
  return fetch(`${requestConfiguration.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: requestConfiguration.headers,
  }).then((res) => checkRequest(res));
}

export function addLikeOnCard(cardId) {
  return fetch(`${requestConfiguration.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: requestConfiguration.headers,
  }).then((res) => checkRequest(res));
}

export function removeLikeOnCard(cardId) {
  return fetch(`${requestConfiguration.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: requestConfiguration.headers,
  }).then((res) => checkRequest(res));
}