// ---------- Project Data ----------
// Based on Vu Hong Lam's CV; feel free to edit/add your own projects.
const projects = [
  {
    id: 1,
    title: "House Price Prediction",
    category: "ml",
    categoryLabel: "Machine Learning",
    summary: "Regression models to predict house prices, deployed as a web app.",
    details: [
      "Built and evaluated multiple regression models, from Linear Regression to XGBoost, for high predictive accuracy.",
      "Provided a tool for non-technical users to get real-time, data-driven price estimates.",
      "Deployed the final model as an interactive web app using Streamlit."
    ]
  },
  {
    id: 2,
    title: "Face Detection & Attendance System",
    category: "cv",
    categoryLabel: "Computer Vision",
    summary: "Real-time face recognition system using an IP camera and OpenCV.",
    details: [
      "Used an IP camera as input via RTSP protocol, combining image processing and facial recognition with OpenCV.",
      "Applied Gaussian Blur, CLAHE, and Haar Cascade to process images and recognize facial features.",
      "Recorded attendance in a CSV file with name, time, and confidence level."
    ]
  },
  {
    id: 3,
    title: "Auto IT Helpdesk (Capstone Project)",
    category: "nlp",
    categoryLabel: "NLP / GenAI",
    summary: "Hybrid ML + Generative AI system to automate IT support tickets.",
    details: [
      "Improved efficiency of IT support queues through automated classification and prioritization.",
      "Combined discriminative ML for classification with Generative AI for automated responses.",
      "Used DistilBERT to handle a wide variety of user requests.",
      "Implemented a RAG mechanism to reduce hallucinations common in standalone LLMs."
    ]
  },
  {
    id: 4,
    title: "Sentiment Analysis Dashboard",
    category: "nlp",
    categoryLabel: "NLP / GenAI",
    summary: "Example project idea: analyze and visualize sentiment from text data.",
    details: [
      "Collect and clean text data (reviews, tweets, etc.).",
      "Train a classifier to label sentiment as positive, neutral, or negative.",
      "Visualize trends over time on an interactive dashboard."
    ]
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    category: "web",
    categoryLabel: "Web App",
    summary: "This very site! A responsive portfolio built with HTML, CSS, and JS.",
    details: [
      "Fully responsive layout using CSS Grid and Flexbox.",
      "Vanilla JavaScript filtering and modal system, no frameworks.",
      "Built with accessibility in mind: semantic HTML and keyboard support."
    ]
  },
  {
    id: 6,
    title: "Object Detection Explorer",
    category: "cv",
    categoryLabel: "Computer Vision",
    summary: "Example project idea: explore object detection models on custom images.",
    details: [
      "Use a pretrained model (e.g., YOLO) to detect objects in uploaded images.",
      "Display bounding boxes and confidence scores.",
      "Experiment with fine-tuning on a custom dataset."
    ]
  }
];

// ---------- Render Projects ----------
const projectsGrid = document.getElementById("projectsGrid");

function renderProjects(filter = "all") {
  projectsGrid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("button");
    card.className = "project-card";
    card.type = "button";
    card.dataset.category = project.category;
    card.setAttribute("aria-haspopup", "dialog");
    card.innerHTML = `
      <span class="project-tag">${project.categoryLabel}</span>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
    `;

    if (filter !== "all" && project.category !== filter) {
      card.classList.add("hidden");
    }

    card.addEventListener("click", () => openModal(project));
    projectsGrid.appendChild(card);
  });
}

renderProjects();

// ---------- Filtering ----------
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// ---------- Modal ----------
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalDetails = document.getElementById("modalDetails");
const modalClose = document.getElementById("modalClose");

let lastFocusedElement = null;

function openModal(project) {
  lastFocusedElement = document.activeElement;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.categoryLabel;
  modalDescription.textContent = project.summary;

  modalDetails.innerHTML = `
    <ul>
      ${project.details.map((d) => `<li>${d}</li>`).join("")}
    </ul>
  `;

  modalOverlay.classList.add("open");
  modalClose.focus();
  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.removeEventListener("keydown", handleModalKeydown);
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleModalKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
    return;
  }

  // Basic focus trap
  if (e.key === "Tab") {
    const focusableElements = modal.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// ---------- Mobile Nav Toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Footer Year ----------
document.getElementById("year").textContent = new Date().getFullYear();