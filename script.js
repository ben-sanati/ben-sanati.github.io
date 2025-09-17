// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const iconSun = themeToggleBtn.querySelector(".icon-sun");
  const iconMoon = themeToggleBtn.querySelector(".icon-moon");
  const body = document.body;

  const pubSearchInput = document.getElementById("pub-search");
  const pubList = document.getElementById("pub-list");

  const pubModal = document.getElementById("pub-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalAuthors = document.getElementById("modal-authors");
  const modalAbstract = document.getElementById("modal-abstract");
  const modalPdfLink = document.getElementById("modal-pdf");
  const modalCloseBtn = document.getElementById("modal-close");

  // Sample publications data (replace or load dynamically)
//   const publications = [
//     {
//       title: "Continual Learning with Stochastic Processes",
//       authors: "Ben Sanati, A. Researcher",
//       abstract: "Explores continual learning through novel stochastic methods.",
//       pdf: "assets/papers/continual_learning.pdf",
//     },
//     {
//       title: "Robust Neural Networks",
//       authors: "Ben Sanati, B. Scientist",
//       abstract:
//         "Techniques to improve robustness of neural nets against attacks.",
//       pdf: "assets/papers/robust_nn.pdf",
//     },
//     {
//       title: "Human-in-the-Loop AI Systems",
//       authors: "Ben Sanati, C. Developer",
//       abstract: "Integrating human feedback into AI training pipelines.",
//       pdf: "assets/papers/human_loop_ai.pdf",
//     },
//     // Add more here...
//   ];

  // Initialize theme from localStorage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.classList.toggle("light", savedTheme === "light");
    } else {
      // Detect prefers-color-scheme
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      body.classList.toggle("light", prefersLight);
    }
    updateThemeIcons();
  }

  // Update theme icons visibility
  function updateThemeIcons() {
    const isLight = body.classList.contains("light");
    iconSun.hidden = isLight;
    iconMoon.hidden = !isLight;
  }

  // Toggle light/dark theme and save preference
  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    updateThemeIcons();
    localStorage.setItem(
      "theme",
      body.classList.contains("light") ? "light" : "dark"
    );
  });

  // Smooth scroll helper (used in hero button)
  window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleFadeIn() {
    const aboutContact = document.getElementById("about");
    if (!aboutContact) {
      // If the #about section is removed, just remove the event listener and return
      window.removeEventListener("scroll", handleFadeIn);
      return;
    }
    const rect = aboutContact.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.85) {
      aboutContact.classList.add("visible");
      window.removeEventListener("scroll", handleFadeIn);
    }
  }

  window.addEventListener("scroll", handleFadeIn);
  handleFadeIn(); // check on load

  // Render publication list filtered by search
  function renderPublications(filter = "") {
    pubList.innerHTML = "";
    const filteredPubs = publications.filter(
      (pub) =>
        pub.title.toLowerCase().includes(filter.toLowerCase()) ||
        pub.authors.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredPubs.length === 0) {
      pubList.textContent = "No publications found.";
      return;
    }

    filteredPubs.forEach((pub, i) => {
      const item = document.createElement("div");
      item.className = "pub-item";
      item.tabIndex = 0;
      item.setAttribute("role", "listitem");
      item.innerHTML = `<h4>${pub.title}</h4><p>${pub.authors}</p>`;
      item.addEventListener("click", () => openModal(pub));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(pub);
        }
      });
      pubList.appendChild(item);
    });
  }

  // Open modal with publication details
  function openModal(pub) {
    modalTitle.textContent = pub.title;
    modalAuthors.textContent = pub.authors;
    modalAbstract.textContent = pub.abstract;
    modalPdfLink.href = pub.pdf;
    pubModal.setAttribute("aria-hidden", "false");
    modalCloseBtn.focus();
  }

  // Close modal
  function closeModal() {
    pubModal.setAttribute("aria-hidden", "true");
    pubSearchInput.focus();
  }

  modalCloseBtn.addEventListener("click", closeModal);

  // Close modal on ESC
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      pubModal.getAttribute("aria-hidden") === "false"
    ) {
      closeModal();
    }
  });

  // Search input listener
  if (pubSearchInput) {
    pubSearchInput.addEventListener("input", (e) => {
      renderPublications(e.target.value);
    });
  }

  // Initialize publications list & theme on load
  initTheme();
  renderPublications();

  // Background canvas animation example
  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();
});
