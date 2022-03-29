"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var documentElements = {
  nameDisplay: document.getElementById("name"),
  topNav: document.getElementById("top_nav"),
  burgerMenu: document.getElementsByClassName("burger_menu_container")[0],
  scrollDisplay: {
    display: document.getElementsByClassName("displayScroll")[0],
    currentScrollPercentage: 0,
    currentPage: 1
  },
  sideNav: {
    container: document.getElementById("sideNav"),
    nav_circles: document.getElementsByClassName("side_circle")
  },
  contact_form: {
    container: document.getElementById("contact_me_form"),
    resetButton: document.getElementById("reset_button"),
    resetForm: function resetForm() {
      return document.getElementById("contact_me_form").reset();
    }
  }
};
var projects = {
  container: document.getElementsByClassName("gallery_container")[0],
  navbar: document.getElementsByClassName("projects_navigation_bar")[0].getElementsByClassName("active_bar_field")[0],
  selectProjectGroup: document.getElementsByClassName("project_field"),
  projectGalleryFields: document.querySelectorAll(".project gallery div"),
  changeProjectField: function changeProjectField() {
    var value = this.classList[1];
    var percentage = value * 35;
    var containerWidth = window.getComputedStyle(document.querySelector(".project_gallery")).width.split("p")[0];
    document.querySelector(".project_gallery .slider").style.right = "".concat(value * containerWidth, "px");
    document.getElementById("active_bar_field").style.left = " ".concat(getPercentageOfContainerAsPx(document.querySelector(".projects_navigation_bar"), percentage, "left"), "px");
  }
};

function getPercentageOfContainerAsPx(container, percentage, value) {
  var containerValue = parseFloat(window.getComputedStyle(container)["width"].split("p"));
  console.log(containerValue * percentage / 100);
  return containerValue * percentage / 100;
}

function updateNavOnScroll() {
  if (documentElements.scrollDisplay.currentScrollPercentage >= 90) {
    if (!documentElements.burgerMenu.classList.contains("active")) {
      documentElements.nameDisplay.style.display = "block";
      documentElements.topNav.style.justifyContent = "space-between";
    } else {
      documentElements.topNav.style.justifyContent = "center";
    }
  } else {
    documentElements.nameDisplay.style.display = "none";
    documentElements.topNav.style.justifyContent = "center";
  }
}

function scrollPercentageY(element) {
  var currentScroll = element.display.scrollTop;
  var elementHeight = element.display.offsetHeight;
  element.currentScrollPercentage = Math.round(currentScroll / elementHeight * 100);
}

function updateCurrentPage(element) {
  if (element.currentScrollPercentage == 0) {
    console.log("works");
    ;
    return 1;
  } else {
    return Math.ceil(element.currentScrollPercentage / 100);
  }
}

function updateSideNavigationOnScroll() {
  for (var i = 0; i < documentElements.sideNav.nav_circles.length; i++) {
    if (i == documentElements.scrollDisplay.currentPage - 1) {
      documentElements.sideNav.nav_circles[i].classList.add("active");
    } else {
      documentElements.sideNav.nav_circles[i].classList.remove("active");
    }
  }
}

function updateScrollDisplayOnScroll() {
  updateNavOnScroll();
  scrollPercentageY(documentElements.scrollDisplay);
  documentElements.scrollDisplay.currentPage = updateCurrentPage(documentElements.scrollDisplay);
  updateSideNavigationOnScroll();
}

function burgerMenuToggle() {
  var navlinks = _toConsumableArray(document.getElementsByClassName("nav_link"));

  console.log(navlinks);

  if (this.classList.contains("active")) {
    this.classList.remove("active");
    navlinks.forEach(function (navlink) {
      navlink.style.display = "none";
    });
    documentElements.nameDisplay.style.display = "block";
    documentElements.topNav.style.position = "relative";
  } else {
    this.classList.add("active");
    navlinks.forEach(function (navlink) {
      navlink.style.display = "flex";
    });
    documentElements.topNav.style.position = "absolute";
    documentElements.nameDisplay.style.display = "none";
  }
}

documentElements.scrollDisplay.display.addEventListener("scroll", updateScrollDisplayOnScroll);
documentElements.contact_form.resetButton.addEventListener("click", documentElements.contact_form.resetForm);

for (var i = 0; i < projects.selectProjectGroup.length; i++) {
  projects.selectProjectGroup[i].addEventListener("click", projects.changeProjectField);
}

document.getElementsByClassName("burger_menu_container")[0].addEventListener("click", burgerMenuToggle);