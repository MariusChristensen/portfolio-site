/**
 * Portfolio Site Interactivity
 * Handles scroll-to-top functionality and keyboard shortcuts
 */

// DOM elements
const scrollButton = document.getElementById("scroll-top");
const footer = document.querySelector("footer");

/**
 * Scroll to top when Escape key is pressed
 */
document.addEventListener("keydown", (e) => {
  // Only respond to Escape key
  if (e.key === "Escape") {
    e.preventDefault(); // Prevent any default behavior
    scrollToTop();
  }
});

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
