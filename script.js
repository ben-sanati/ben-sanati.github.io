// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const iconSun = themeToggleBtn.querySelector(".icon-sun");
  const iconMoon = themeToggleBtn.querySelector(".icon-moon");
  const body = document.body;

  const pubList = document.getElementById("pub-list");

  const pubModal = document.getElementById("pub-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalAuthors = document.getElementById("modal-authors");
  const modalAbstract = document.getElementById("modal-abstract");
  const modalPdfLink = document.getElementById("modal-pdf");
  const modalCloseBtn = document.getElementById("modal-close");

  // Sample publications data (replace or load dynamically)
  const publications = [
    {
      title: "Forgetting is Everywhere",
      authors: "<strong>Ben Sanati</strong>, Thomas L. Lee, Trevor McInroe, Aidan Scannell,<br>Nikolay Malkin, David Abel, Amos Storkey",
      abstract:
        "A fundamental challenge in developing general learning algorithms is their tendency to forget past knowledge when adapting to new data. Addressing this problem requires a principled understanding of forgetting; yet, despite decades of study, no unified definition has emerged that provides insights into the underlying dynamics of learning. We propose an algorithm- and task-agnostic theory that characterises forgetting as a lack of self-consistency in a learner's predictive distribution over future experiences, manifesting as a loss of predictive information. Our theory naturally yields a general measure of an algorithm's propensity to forget. To validate the theory, we design a comprehensive set of experiments that span classification, regression, generative modelling, and reinforcement learning.We empirically demonstrate how forgetting is present across all learning settings and plays a significant role in determining learning efficiency. Together, these results establish a principled understanding of forgetting and lay the foundation for analysing and improving the information retention capabilities of general learning algorithms.",
      pitch: "Forgetting is a fundamental challenge in machine learning, yet it is poorly understood. In this paper, we propose a principled theory of forgetting and ask: What is forgetting, why does it occur, and how does it impact learning?",
      arxiv: "https://arxiv.org/abs/1234.5678",
      project: "https://ben-sanati.github.io/forgetting-is-everywhere-project/",
      imageLight: "assets/pub_imgs/absorption_loss.png",
      imageDark: "assets/pub_imgs/absorption_loss_dark.png",
    },
  ];

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
    updateCardImages(); // <-- switch images when theme changes
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

    filteredPubs.forEach((pub) => {
      const item = document.createElement("div");
      item.className = "pub-card";
      item.tabIndex = 0;
      item.setAttribute("role", "listitem");

      item.innerHTML = `
      <div class="pub-image-container">
        <img src="${pub.imageLight}" alt="${pub.title}" class="pub-image-light">
        <img src="${pub.imageDark}" alt="${pub.title}" class="pub-image-dark">
        <div class="pub-overlay">
          <p class="pub-pitch">${pub.pitch}</p>
        </div>

      </div>
      <h4 class="pub-title">${pub.title}</h4>
    `;

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

  function updateCardImages() {
    const isLight = body.classList.contains("light");
    document.querySelectorAll(".pub-card").forEach((card) => {
      const imgLight = card.querySelector(".pub-image-light");
      const imgDark = card.querySelector(".pub-image-dark");
      if (imgLight && imgDark) {
        imgLight.style.display = isLight ? "block" : "none";
        imgDark.style.display = isLight ? "none" : "block";
      }
    });
  }

  // Open modal with publication details
  function openModal(pub) {
    modalTitle.innerHTML = pub.title;
    modalAuthors.innerHTML = pub.authors;
    modalAbstract.innerHTML = `<strong>Abstract</strong><br>${pub.abstract}`;

    modalPdfLink.href = pub.arxiv;
    modalPdfLink.textContent = "ArXiv";

    const existingProjectBtn = document.getElementById("modal-project-btn");
    if (existingProjectBtn) existingProjectBtn.remove();

    if (pub.project) {
      const projectBtn = document.createElement("a");
      projectBtn.href = pub.project;
      projectBtn.target = "_blank";
      projectBtn.className = modalPdfLink.className;
      projectBtn.id = "modal-project-btn";
      projectBtn.textContent = "Project Page";

      projectBtn.style.marginLeft = "1rem";
      modalPdfLink.insertAdjacentElement("afterend", projectBtn);
    }

    pubModal.setAttribute("aria-hidden", "false");
    modalCloseBtn.focus();
  }

  // Close modal
  function closeModal() {
    pubModal.setAttribute("aria-hidden", "true");
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

  // Initialize publications list & theme on load
  initTheme();
  renderPublications();
  updateCardImages();

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
