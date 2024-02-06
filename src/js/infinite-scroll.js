const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
let initialLoad = true;
let count = 30;
const apiKey = `vpekuTBQga_GNYO_BXKO_JcW4wF__4D0VbE7AQolGxI`;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/**
 * The function "setAttributes" sets multiple attributes on an HTML element.
 * @param element - The `element` parameter is the HTML element to which you want to set attributes. It
 * can be any valid HTML element, such as `<div>`, `<p>`, `<img>`, etc.
 * @param attributes - An object containing key-value pairs where the key represents the attribute name
 * and the value represents the attribute value.
 */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function changeInitialLoadCount(count) {
  apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
      loading: "lazy",
      class: "photo",
    });

    item.appendChild(img);
    imgContainer.appendChild(item);
    lastPhotoObserver.observe(img);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    if (initialLoad) {
      changeInitialLoadCount(30);
      initialLoad = false;
    }
  } catch (error) {}
}

// window.addEventListener("scroll", () => {
//   if (
//     window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
//     ready
//   ) {
//     ready = false;
//     getPhotos();
//   }
// });

const lastPhotoObserver = new IntersectionObserver(
  (entries) => {
    const lastPhoto = entries[0];
    console.log(lastPhoto);
    if (!lastPhoto.isIntersecting) return;
    getPhotos();
    lastPhotoObserver.unobserve(lastPhoto.target);
    lastPhotoObserver.observe(document.querySelector(".photo:last-child"));
  },
  {
    rootMargin: "400px",
  }
);

// lastPhotoObserver.observe(document.querySelector(".photo:last-child"));

// On Load
getPhotos();
