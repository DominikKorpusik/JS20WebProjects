const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const imgs = document.querySelectorAll("img");

const imageMode = (color) => {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].src = `/svg/undraw_${i}_${color}.svg`;
  }
};

const setTheme = (isDark) => {
  const documentElement = document.documentElement;
  documentElement.setAttribute("data-theme", isDark);
  localStorage.setItem("theme", isDark);
};

function switchTheme(e) {
  const isDark = e.target.checked;
  const toggleText = toggleIcon.children[0];
  const toggleSvg = toggleIcon.children[1];
  toggleText.textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleSvg.classList.replace("fa-sun", "fa-moon")
    : toggleSvg.classList.replace("fa-moon", "fa-sun");

  isDark ? imageMode("dark") : imageMode("light");
  setTheme(isDark);
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme.toLowerCase() === "true") {
  setTheme(currentTheme);
  toggleSwitch.checked = currentTheme;
  toggleDarkLightMode(currentTheme);
}
