console.log("Hello World");

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

const scrollButton = document.getElementById("scroll-top");
const footer = document.querySelector("footer");

// Show button when scrolling down
window.addEventListener("scroll", () => {
  const footerRect = footer.getBoundingClientRect();
  const footerTop = footerRect.top;

  if (window.scrollY > 300) {
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
});

// Scroll to top when clicked
scrollButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
