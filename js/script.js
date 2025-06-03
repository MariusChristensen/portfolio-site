/**
 * Portfolio Site Interactivity
 * Handles scroll-to-top functionality and image gallery modal
 */

// DOM elements
const scrollButton = document.getElementById("scroll-top");
const footer = document.querySelector("footer");

/**
 * Show button when scrolling down and adjust position when near footer
 */
window.addEventListener("scroll", () => {
  handleScrollButtonVisibility();
});

/**
 * Scroll to top when button is clicked
 */
scrollButton.addEventListener("click", scrollToTop);

/**
 * Handles the visibility of the scroll button based on scroll position
 * and adjusts its position when approaching the footer
 */
function handleScrollButtonVisibility() {
  const footerRect = footer.getBoundingClientRect();
  const footerTop = footerRect.top;
  const scrollThreshold = 300;

  if (window.scrollY > scrollThreshold) {
    scrollButton.classList.add("visible");

    // Adjust button position when near footer
    if (footerTop < window.innerHeight) {
      const bottomValue = window.innerHeight - footerTop + 20;
      scrollButton.style.bottom = `${bottomValue}px`;
    } else {
      scrollButton.style.bottom = "20px";
    }
  } else {
    scrollButton.classList.remove("visible");
  }
}

/**
 * Scrolls to the top of the page with smooth animation
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Image Gallery Modal Functionality
 */
const galleryModal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.querySelector(".modal-caption");
const modalCounter = document.querySelector(".modal-counter");
const modalClose = document.querySelector(".modal-close");
const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");

let currentImageIndex = 0;
let currentGallery = [];

// Gallery images data
const galleries = {
  case1: [
    { src: "images/before-1.jpg", alt: "Original product page" },
    { src: "images/before-2.jpg", alt: "Original product page" },
    { src: "images/before-3.jpg", alt: "Original product page" },
    { src: "images/after-1.jpg", alt: "Improved wireframe" },
    { src: "images/after-2.jpg", alt: "Improved wireframe" },
    { src: "images/after-3.jpg", alt: "Improved wireframe" },
  ],
};

/**
 * Opens the gallery modal with the specified image
 */
function openModal(galleryName, imageIndex) {
  currentGallery = galleries[galleryName] || [];
  currentImageIndex = imageIndex;

  if (currentGallery.length === 0) return;

  updateModalImage();
  galleryModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

/**
 * Closes the gallery modal
 */
function closeModal() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Updates the modal image and caption
 */
function updateModalImage() {
  const image = currentGallery[currentImageIndex];
  if (!image) return;

  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalCaption.textContent = image.alt;
  modalCounter.textContent = `${currentImageIndex + 1} / ${
    currentGallery.length
  }`;

  // Update navigation button states
  modalPrev.disabled = currentImageIndex === 0;
  modalNext.disabled = currentImageIndex === currentGallery.length - 1;
}

/**
 * Navigate to previous image
 */
function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateModalImage();
  }
}

/**
 * Navigate to next image
 */
function nextImage() {
  if (currentImageIndex < currentGallery.length - 1) {
    currentImageIndex++;
    updateModalImage();
  }
}

// Event listeners for gallery
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("thumbnail")) {
    const galleryName = e.target.dataset.gallery;
    const imageIndex = parseInt(e.target.dataset.index);
    openModal(galleryName, imageIndex);
  }
});

// Modal controls
modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", previousImage);
modalNext.addEventListener("click", nextImage);

// Close modal when clicking outside the image
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeModal();
  }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("active")) return;

  switch (e.key) {
    case "Escape":
      closeModal();
      break;
    case "ArrowLeft":
      previousImage();
      break;
    case "ArrowRight":
      nextImage();
      break;
  }
});
