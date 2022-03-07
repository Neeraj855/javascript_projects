const id = (id) => document.getElementById(id);
const className = (className) => document.getElementsByClassName(className);

const userName = id("userName"),
  userEmail = id("userEmail"),
  userPassword = id("userPassword"),
  form = id("form");

const errorMsg = className("error"),
  successIcon = className("success-icon"),
  failureIcon = className("failure-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateForm(userName, 0, "Username cannot be blank");
  validateForm(userEmail, 1, "Email cannot be blank");
  validateForm(userPassword, 2, "Password cannot be blank");
});

const validateForm = (id, serial, message) => {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    failureIcon[serial].style.opacity = "1";
    successIcon[serial].style.opacity = "0";
  } else {
    errorMsg[serial].innerHTML = "";
    successIcon[serial].style.opacity = "1";
    failureIcon[serial].style.opacity = "0";
  }
};
