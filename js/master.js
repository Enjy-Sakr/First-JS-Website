// MAIN FUNCTIONS

function scrollingToPlace(element) {
    element.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.scroll).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

// END MAIN FUNCTIONS
// START SETTINGS BOX

let settingsBoxGear = document.getElementsByClassName("settings-box-gear")[0];
let settingsBox = document.getElementsByClassName("settings-box")[0];
let gearBox = document.getElementsByClassName("gear-box")[0];

settingsBoxGear.onclick = function () {
    settingsBox.classList.toggle("open");
    settingsBoxGear.classList.toggle("fa-spin");
};

settingsBoxGear.onmouseenter = function () {
    settingsBoxGear.classList.add("fa-spin");
};

settingsBoxGear.onmouseleave = function () {
    settingsBoxGear.classList.remove("fa-spin");
};

// END SETTINGS BOX
// START OPTION BOX

let optionColorLi = document.querySelectorAll(".option-colors li");

optionColorLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        localStorage.setItem("colorUsed", e.target.dataset.color);
        e.target.parentElement
            .querySelectorAll(".opacity-full")
            .forEach((el) => {
                el.classList.remove("opacity-full");
            });
        e.target.classList.add("opacity-full");
    });
});

if (localStorage.colorUsed) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.colorUsed
    );
    optionColorLi.forEach((element) => {
        element.classList.remove("opacity-full");
        if (element.dataset.color === localStorage.colorUsed) {
            element.classList.add("opacity-full");
        }
    });
}

// END OPTION BOX
// START NAVIGATION BULLETS

let bullet = document.querySelectorAll(".bullet div");
let bulletParagraph = document.querySelectorAll(".bullet p");
let testimonialsArea = document.querySelector(".testimonials");
let roundedBullets = document.querySelectorAll(".bullet .rounded-bullet");

scrollingToPlace(bullet);

let showOrNotNavigation = document.querySelector(".show-or-not span");

showOrNotNavigation.onclick = function () {
    if (showOrNotNavigation.innerHTML === "Hide") {
        showOrNotNavigation.innerHTML = "Show";
        bullet.forEach((el) => {
            el.style.display = "none";
        });
        localStorage.setItem("showBulletOrNot", "Hide");
    } else if (showOrNotNavigation.innerHTML === "Show") {
        showOrNotNavigation.innerHTML = "Hide";
        bullet.forEach((el) => {
            el.style.display = "flex";
        });
        localStorage.setItem("showBulletOrNot", "Show");
    }
};

if (localStorage.showBulletOrNot) {
    if (localStorage.showBulletOrNot === "Show") {
        bullet.forEach((el) => {
            el.style.display = "flex";
        });
        showOrNotNavigation.innerHTML = "Hide";
    } else if (localStorage.showBulletOrNot === "Hide") {
        bullet.forEach((el) => {
            el.style.display = "none";
        });
        showOrNotNavigation.innerHTML = "Show";
    }
}

let contactUsArea = document.querySelector(".contact-us");

window.addEventListener("scroll", () => {
    roundedBullets.forEach((bullet) => {
        if (
            scrollY >= testimonialsArea.offsetTop - "250" &&
            scrollY <= contactUsArea.offsetTop - "250"
        ) {
            bullet.style.border = "2px solid white";
        } else {
            bullet.style.border = "2px solid var(--main-color)";
        }
    });
});

let resetButton = document.querySelector(".reset-site");

// END NAVIGATION BULLETS

// START LANDING AREA
// Getting Landing Page

let landingPage = document.getElementsByClassName("landing-area")[0];

// Array Of Images

let landingPageArray = ["1", "2", "3", "4", "5"];

// Getting Random Numbers Same Number As URL Images
// Changing Landing Page Images Automatically
// START OPTION BOX RANDOM BACKGROUNDS

let landingPageRandom;
let backgroundInterval;
let randomizingBackgrounds = true;

function backgroundIntervalFunction() {
    if (randomizingBackgrounds === true) {
        backgroundInterval = setInterval(() => {
            landingPageRandom = Math.floor(
                Math.random() * landingPageArray.length
            );
            landingPage.style.backgroundImage =
                "url('images/Landing Page Images/" +
                landingPageArray[landingPageRandom] +
                ".jpg')";
        }, 8000);
    } else if (randomizingBackgrounds === false) {
        clearInterval(backgroundInterval);
    }
}

landingPage.onclick = function () {
    settingsBox.classList.remove("open");
};

let optionRandomBackgrounds = document.querySelectorAll(
    ".random-backgrounds span"
);

optionRandomBackgrounds.forEach((el) => {
    el.addEventListener("click", (e) => {
        if (e.target.classList.contains("yes")) {
            randomizingBackgrounds = true;
            backgroundIntervalFunction();
            localStorage.setItem("randomOrNot", randomizingBackgrounds);
        } else if (e.target.classList.contains("no")) {
            randomizingBackgrounds = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("randomOrNot", randomizingBackgrounds);
        }
        e.target.parentElement
            .querySelectorAll(".full-opacity")
            .forEach((el) => {
                el.classList.remove("full-opacity");
            });
        e.target.classList.add("full-opacity");
        document.querySelectorAll(".options-backgrounds img").forEach((img) => {
            img.classList.remove("highlighted");
        });
    });
});

if (localStorage.randomOrNot) {
    if (localStorage.randomOrNot === "true") {
        randomizingBackgrounds = true;
    } else {
        randomizingBackgrounds = false;
    }
    optionRandomBackgrounds.forEach((span) => {
        span.classList.remove("full-opacity");
        if (span.dataset.random === localStorage.randomOrNot) {
            span.classList.add("full-opacity");
        }
    });
}

backgroundIntervalFunction();

let websiteLinks = document.querySelectorAll(".header-links li a");

scrollingToPlace(websiteLinks);

let allHeaderLinks = document.querySelector(".header-links");
let toggleButton = document.querySelector(".toggle-menu");
let toggleButtonSpan = document.querySelectorAll(".toggle-menu span");

document.addEventListener("click", (e) => {
    if (
        e.target !== toggleButton &&
        e.target !== allHeaderLinks &&
        e.target !== toggleButtonSpan
    ) {
        if (allHeaderLinks.classList.contains("open")) {
            allHeaderLinks.classList.remove("open");
        }
    }
});

function openingToggleMenu(elements, eventName) {
    elements.forEach((element) => {
        element.addEventListener(eventName, (e) => {
            e.stopPropagation();
            allHeaderLinks.classList.toggle("open");
        });
    });
}

openingToggleMenu([toggleButton, ...toggleButtonSpan], "click");
openingToggleMenu([toggleButton, ...toggleButtonSpan], "touchend");

// END OPTION BOX RANDOM BACKGROUNDS

// START CHOOSE BACKGROUND OPTION

let backgroundBalls = document.querySelectorAll(".options-backgrounds img");

backgroundBalls.forEach((img) => {
    img.addEventListener("click", (e) => {
        localStorage.setItem("backgroundBall", e.target.dataset.image);
        clearInterval(backgroundInterval);
        landingPage.style.backgroundImage = e.target.dataset.image;
        e.target.parentElement
            .querySelectorAll(".highlighted")
            .forEach((el) => {
                el.classList.remove("highlighted");
            });
        e.target.classList.add("highlighted");
        document
            .querySelector(".random-backgrounds span.no")
            .classList.add("full-opacity");
        document
            .querySelector(".random-backgrounds span.yes")
            .classList.remove("full-opacity");
    });
});

if (localStorage.backgroundBall) {
    landingPage.style.backgroundImage = localStorage.backgroundBall;
    backgroundBalls.forEach((el) => {
        el.classList.remove("highlighted");
        if (el.dataset.image === localStorage.backgroundBall) {
            el.classList.add("highlighted");
        }
    });
}

// END CHOOSE BACKGROUND OPTION
// END LANDING AREA

// START SKILLS AREA

let aboutArea = document.getElementsByClassName("about-us")[0];
let skillsArea = document.getElementsByClassName("skills")[0];

let percentageSpan = document.querySelectorAll(".skills-area .percentage");

window.onscroll = function () {
    if (
        window.pageYOffset >
        skillsArea.offsetTop + skillsArea.offsetHeight - this.innerHeight
    ) {
        percentageSpan.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
    }
};

// END SKILLS AREA

// START GALLERY AREA

let galleryImages = document.querySelectorAll(".gallery-area img");

galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
        let galleryOverlay = document.createElement("div");
        galleryOverlay.className = "gallery-overlay";
        document.body.appendChild(galleryOverlay);
        let galleryImageBox = document.createElement("div");
        galleryImageBox.className = "gallery-image-box";
        galleryOverlay.appendChild(galleryImageBox);
        let galleryOverlayImage = document.createElement("img");
        galleryOverlayImage.className = "gallery-overlay-image";
        galleryOverlayImage.src = e.target.src;
        galleryImageBox.appendChild(galleryOverlayImage);
        let galleryOverlayCloseButton = document.createElement("span");
        galleryOverlayCloseButton.innerHTML = "X";
        galleryOverlayCloseButton.className = "gallery-close-button";
        galleryImageBox.appendChild(galleryOverlayCloseButton);
        galleryOverlayCloseButton.addEventListener("click", (e) => {
            e.target.parentElement.remove();
            galleryOverlay.remove();
        });
    });
});

// END GALLERY AREA

// START FOOTER

let footerDate = document.querySelector(".footer span");

footerDate.innerHTML = new Date().getFullYear();

// END FOOTER
