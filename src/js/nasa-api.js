const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: "instant" });
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }

  loader.classList.add("hidden");
}

const createDOMNodes = (page) => {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    const card = document.createElement("div");
    card.className = "card";

    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.src = result.url;
    image.alt = result.title;
    image.loading = "lazy";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = result.title;

    const clickable = document.createElement("p");
    clickable.className = "clickable";
    if (page === "results") {
      clickable.textContent = "Add to Favorites";
      clickable.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      clickable.textContent = "Remove Favorite";
      clickable.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = result.explanation;

    const footer = document.createElement("small");
    footer.className = "text-muted";

    const date = document.createElement("strong");
    date.textContent = result.date;

    const copyright = document.createElement("span");
    copyright.textContent = result.copyRight || "";

    footer.append(date, copyright);
    cardBody.append(cardTitle, clickable, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
};

const updateDOM = (page) => {
  favorites = JSON.parse(localStorage.getItem("nasaFavorites")) || {};
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showContent(page);
};

const saveFavorite = (itemUrl) => {
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in Local Storage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
};

function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in Local Storage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

const getNasaPictures = async () => {
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("results");
  } catch (error) {
    console.log(error);
  }
};

// On Load
getNasaPictures();
