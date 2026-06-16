/* ============================================================
   GLOBAL: MOBILE NAVIGATION TOGGLE
============================================================ */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* ============================================================
   LOGIN & SIGN UP PAGE INTERACTIVITY
============================================================ */
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Shows the login form and hides the sign up form
function showLogin() {
  if (!loginBox || !signupBox) return;
  loginBox.classList.remove("hidden");
  signupBox.classList.add("hidden");
  if (loginBtn) loginBtn.classList.add("active");
  if (signupBtn) signupBtn.classList.remove("active");
}

// Shows the sign up form and hides the login form
function showSignup() {
  if (!loginBox || !signupBox) return;
  signupBox.classList.remove("hidden");
  loginBox.classList.add("hidden");
  if (signupBtn) signupBtn.classList.add("active");
  if (loginBtn) loginBtn.classList.remove("active");
}

if (switchToSignup) switchToSignup.addEventListener("click", showSignup);
if (switchToLogin) switchToLogin.addEventListener("click", showLogin);
if (loginBtn) loginBtn.addEventListener("click", showLogin);
if (signupBtn) signupBtn.addEventListener("click", showSignup);
if (window.location.hash === "#signup") showSignup();

/* ============================================================
   CONTENTS PAGE: SEARCH, CATEGORY FILTER + RESULTS COUNT
============================================================ */
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const contentCards = document.querySelectorAll(".content-card");
const resultsCount = document.getElementById("resultsCount");
const filterHelp = document.getElementById("filterHelp");
const filterContainer = document.querySelector(".filter-container");

// Hides cards that do not match the selected category/search text
function filterContents() {
  if (!contentCards.length) return;

  const searchText = (searchBar?.value || "").trim().toLowerCase();
  const selectedCategory = (categoryFilter?.value || "all").toLowerCase();
  let visibleCount = 0;

  contentCards.forEach(card => {
    const cardCategory = (card.dataset.category || "").toLowerCase();
    const cardText = `${card.dataset.title || ""} ${card.textContent || ""}`.toLowerCase();

    const matchesCategory = selectedCategory === "all" || cardCategory === selectedCategory;
    const matchesSearch = searchText === "" || cardText.includes(searchText);
    const shouldShow = matchesCategory && matchesSearch;

    card.classList.toggle("is-hidden", !shouldShow);
    card.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    if (shouldShow) visibleCount += 1;
  });

  // Updates the feedback text below the filter controls
  if (resultsCount) {
    resultsCount.textContent = `Showing ${visibleCount} experience${visibleCount === 1 ? "" : "s"}`;
  }

  if (filterHelp) {
    const categoryName = categoryFilter?.selectedOptions?.[0]?.textContent || "All Categories";
    if (visibleCount === 0) {
      filterHelp.textContent = "No experiences match your search or category.";
    } else if (selectedCategory === "all") {
      filterHelp.textContent = "Showing all VR experience categories.";
    } else {
      filterHelp.textContent = `Showing ${categoryName} experiences only.`;
    }
  }

  if (filterContainer) {
    filterContainer.classList.toggle("filter-active", selectedCategory !== "all" || searchText !== "");
  }
}

if (searchBar) searchBar.addEventListener("input", filterContents);
if (categoryFilter) categoryFilter.addEventListener("change", filterContents);
filterContents();

const experienceModal = document.getElementById("experienceModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPlayers = document.getElementById("modalPlayers");
const modalDuration = document.getElementById("modalDuration");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalAge = document.getElementById("modalAge");
const modalClose = document.querySelector(".modal-close");

// Opens the detail popup using the selected card data
function openExperienceModal(card) {
  if (!experienceModal) return;
  const title = card.querySelector("h3")?.textContent || "Experience";
  const description = card.querySelector("p")?.textContent || "Explore this immersive VR experience.";
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalPlayers.textContent = card.dataset.players || "Players vary";
  modalDuration.textContent = card.dataset.duration || "Duration varies";
  modalDifficulty.textContent = card.dataset.difficulty || "Difficulty varies";
  modalAge.textContent = card.dataset.age || "Age guidance varies";
  experienceModal.classList.remove("hidden");
}

contentCards.forEach(card => {
  card.addEventListener("click", event => {
    if (event.target.classList.contains("book-btn")) return;
    openExperienceModal(card);
  });
});

if (modalClose) modalClose.addEventListener("click", () => experienceModal.classList.add("hidden"));
if (experienceModal) {
  experienceModal.addEventListener("click", event => {
    if (event.target === experienceModal) experienceModal.classList.add("hidden");
  });
}

/* ============================================================
   BOOKINGS PAGE: FORM VALIDATION + VENUE PREVIEW
============================================================ */
const bookingForm = document.querySelector(".booking-form");
const venueSelect = document.getElementById("venue");
const venueCards = document.querySelectorAll(".venue-card");

if (venueSelect) {
  venueSelect.addEventListener("change", () => {
    const selected = venueSelect.value;
    venueCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(selected) ? "block" : "none";
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    const players = document.getElementById("players")?.value;
    const date = document.getElementById("date")?.value;
    const time = document.getElementById("time")?.value;

    if (players && (players < 1 || players > 10)) {
      alert("Players must be between 1 and 10.");
      e.preventDefault();
    }

    if ((!date || !time) && (document.getElementById("date") || document.getElementById("time"))) {
      alert("Please select a valid date and time.");
      e.preventDefault();
    }
  });
}

/* ============================================================
   SMOOTH SCROLLING FOR CTA BUTTONS
============================================================ */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ============================================================
   BOOK BUTTONS
============================================================ */
document.querySelectorAll("button.book-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "bookings.html";
  });
});

/* ============================================================
   DYNAMIC PRICE CALCULATION FOR BOOKINGS PAGE
============================================================ */
const childrenInput = document.getElementById("children");
const adultsInput = document.getElementById("adults");
const variantSelect = document.getElementById("variant");
const orderPrice = document.querySelector(".price");
const orderTotal = document.querySelector(".total");

const CHILD_PRICE = 12;
const ADULT_PRICE = 16;

// Updates the booking price when players or variant change
function calculatePrice() {
  if (!childrenInput || !adultsInput || !variantSelect) return;
  const children = parseInt(childrenInput.value) || 0;
  const adults = parseInt(adultsInput.value) || 0;
  const basePrice = variantSelect.value === "60min" ? 28 : 18;
  const total = basePrice + (children * CHILD_PRICE) + (adults * ADULT_PRICE);
  if (orderPrice) orderPrice.textContent = `£${basePrice}`;
  if (orderTotal) orderTotal.textContent = `£${total}`;
}

if (childrenInput) childrenInput.addEventListener("input", calculatePrice);
if (adultsInput) adultsInput.addEventListener("input", calculatePrice);
if (variantSelect) variantSelect.addEventListener("change", calculatePrice);
calculatePrice();
