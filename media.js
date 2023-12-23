const navBar = document.querySelector("nav");
const hamburgerMenu = document.querySelector("#hamburger");
const topics = document.querySelectorAll(".topics-tab");
let narrowScreen = window.matchMedia("(max-width: 700px)");


narrowScreen.addEventListener("change", function () {
  if (narrowScreen.matches) {
    navBar.style.display = "none";
  } else {
    navBar.style.display = "flex";
  }
});

window.onload = function () {
  if (narrowScreen.matches) {
    navBar.style.display = "none";
  } else {
    navBar.style.display = "flex";
  }
};

function toggleNavbar() {
  if (navBar.style.display === "none") {
    navBar.style.display = "flex";
  } else {
    navBar.style.display = "none";
  }
}

hamburgerMenu.addEventListener("click", () => {
  if (navBar.style.display === "none") {
    navBar.style.display = "flex";
  } else {
    navBar.style.display = "none";
  }
});

for (let i = 0; i < topics.length; i++) {
  topics[i].addEventListener("click", () => {
    if (navBar.style.display === "flex") {
      navBar.style.display = "none";
    }
  });
}
