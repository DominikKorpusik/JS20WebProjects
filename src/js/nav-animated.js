const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

const navItems = [nav1, nav2, nav3, nav4, nav5];
const elements = [...navItems, menuBars];

const onClickToggleNav = (elements) => {
  elements.forEach((element) => {
    element.addEventListener("click", toggleNav);
  });
};

const slideAnimation = (method, className, navItems, delay = 0) => {
  const itemsLength = navItems.length;
  let count = itemsLength;

  if (method === "add" || method === "remove") {
    for (let i = 0; i < itemsLength; i++) {
      const item = navItems[i].classList;

      if (typeof item[method] === "function") {
        i != 0
          ? item[method](
              `slide-delay-${
                className === "slide-out" ? count * delay : i * delay + 200
              }`
            )
          : null;
        count--;
        item[method](className);
      }
    }
  }
};

const toggleNav = () => {
  const overlayClassList = overlay.classList;
  menuBars.classList.toggle("change");
  overlayClassList.toggle("overlay-active");

  if (overlayClassList.contains("overlay-active")) {
    // Animate In - Overlay
    overlayClassList.replace("overlay-slide-left", "overlay-slide-right");
    slideAnimation("remove", "slide-out", navItems, 100);
    slideAnimation("add", "slide-in", navItems, 200);
    // Animate In - Nav Items
  } else {
    // Animate In - Overlay
    overlayClassList.replace("overlay-slide-right", "overlay-slide-left");

    // Animate In - Nav Items
    slideAnimation("remove", "slide-in", navItems, 200);
    slideAnimation("add", "slide-out", navItems, 100);
  }
};

// Event Listeners
onClickToggleNav(elements);
