function showValidationError(
  formElement,
  inputElement,
  errorMessage,
  configuration
) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(configuration.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configuration.errorClass);
}

function hideValidationError(formElement, inputElement, configuration) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(configuration.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(configuration.errorClass);
}

function isValid(formElement, inputElement, configuration) {
  const errorMessage =
    inputElement.dataset.errorMsg || inputElement.validationMessage;
  if (!inputElement.validity.valid) {
    showValidationError(formElement, inputElement, errorMessage, configuration);
  } else {
    hideValidationError(formElement, inputElement, configuration);
  }
}

function checkValidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function changeButtonState(inputList, buttonElement, configuration) {
  if (checkValidInput(inputList)) {
    buttonElement.classList.add(configuration.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configuration.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, configuration) {
  const inputList = Array.from(
    formElement.querySelectorAll(configuration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configuration.submitButtonSelector
  );
  changeButtonState(inputList, buttonElement, configuration);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, configuration);
      changeButtonState(inputList, buttonElement, configuration);
    });
  });
}

export function enableValidation(configuration) {
  const formList = Array.from(
    document.querySelectorAll(configuration.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, configuration);
  });
}

export function clearValidation(formElement, configuration) {
  const inputList = Array.from(
    formElement.querySelectorAll(configuration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configuration.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideValidationError(formElement, inputElement, configuration);
    inputElement.value = ""; // Очистка значений
  });

  changeButtonState(inputList, buttonElement, configuration);
}
