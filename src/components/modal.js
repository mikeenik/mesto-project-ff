export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

export function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
