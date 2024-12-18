const userName = document.getElementById("userName");
const email = document.getElementById("email");
const text = document.getElementById("text");
const radioBtns = document.querySelectorAll(".radioBtn");
const containers = document.querySelectorAll(".container");
const checkBox = document.getElementById("checkbox");
const form = document.getElementById("form");
const consent = document.getElementById("consent");
const radioContainer = document.getElementById("radioContainer");
const pop_up = document.getElementById("pop-up");
const submitBtn = document.getElementById("submitBtn")
let isChecked = false;
let isValid = false;

// show error function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Checkbox error function
function checkBoxError(message) {
  consent.classList.add("error");
  const small = document.getElementById("consentError");
  small.innerText = message;
}

// Radiobuttons error function
function radioBtnError(message) {
  radioContainer.classList.add("error");
  const small = document.getElementById("radioError");
  small.innerText = message;
}
// show success function
function showSuccess(input) {
  formControl = input.parentElement;
  formControl.className = "form-control success";
  isValid = true;
}

// check valid email format
function checkEmail(input) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    isValid = true;
  } else {
    showError(input, "Email is not valid");
  }
}

// check required function
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function validateCheckBox() {
  if (!checkBox.checked) {
    checkBoxError("Your consent is required ");
  } else {
    consent.classList.remove("error");
    isValid = true;
  }
}

// get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRadioBtn() {
  if (isChecked === false) {
    radioBtnError("Select a query type");
  } else {
    radioContainer.classList.remove("error");
    isValid = true;
  }
}

// event listeners
radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", () => {
    // Reset background color for all divs
    containers.forEach((container) => (container.style.backgroundColor = ""));
    radioBtn.closest(".container").style.backgroundColor = "#33d6ff";
    isChecked = true;
    isValid = true;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([userName, email, text]);
  checkEmail(email);
  validateCheckBox(checkBox);
  checkRadioBtn(radioBtns);

  if (isValid === true) {
    pop_up.style.display = "block";
    const inputFields = [userName, email, text];
    inputFields.forEach((inputField) => {
      inputField.value = "";
    });
    checkBox.checked = false;
    radioBtns.forEach((radioBtn) => {
      radioBtn.checked = false;
      containers.forEach((container) => (container.style.backgroundColor = ""));
    });
    submitBtn.disabled = true
  }
});
