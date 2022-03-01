const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const imgage1 = document.getElementById("image1");
const imgage2 = document.getElementById("image2");
const imgage3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// select images based on mode
function imageMode(color) {
  imgage1.src = `./img/undraw_proud_coder_${color}.svg`;
  imgage2.src = `./img/undraw_feeling_proud_${color}.svg`;
  imgage3.src = `./img/undraw_conceptual_idea_${color}.svg`;
}

function toggleMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";

  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  isDark ? imageMode("dark") : imageMode("dark");
}

function switchtheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleMode(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleMode(false);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchtheme);

//Check Local Storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
    toggleMode(true);
  }
}
