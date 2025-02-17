export function setupScroll() {
  const scrollWrapper = document.querySelector(".scroll-container");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (!scrollWrapper || !leftBtn || !rightBtn) {
      console.error("Scroll elements not found!");
      return;
  }

  const scrollAmount = 200;

  rightBtn.addEventListener("click", function () {
      scrollWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", function () {
      scrollWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
}

// Run it automatically
setupScroll();
