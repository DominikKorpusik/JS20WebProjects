const form = document.getElementById("form");
const pass1El = document.getElementById("password1");
const pass2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

const validateForm = () => {
  isValid = form.checkVisibility();
  if (!isValid) {
    message.textContent = "Please fill out all fields";
    message.style.color = "var(--danger-color)";
    return;
  }

  if (pass1El.value === pass2El.value) {
    passwordsMatch = true;
  } else {
    passwordsMatch = false;
    message.textContent = "Make sure passwords match";
    message.style.color = "var(--danger-color)";
    return;
  }

  isValid && passwordsMatch
    ? ((message.textContent = "Successfully Registered!"),
      (message.style.color = "var(--success-color)"))
    : null;
};

const storeFormData = () => {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: "*********",
  };
  console.log(user);
};

const processFormData = (e) => {
  e.preventDefault();
  validateForm();
  isValid && passwordsMatch ? storeFormData() : null;
};

form.addEventListener("submit", processFormData);
