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

export function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  if (!menuToggle || !mainNav) {
      console.error("Mobile menu elements not found!");
      return;
  }

  menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      body.classList.toggle('menu-open');
      menuToggle.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          mainNav.classList.remove('active');
          body.classList.remove('menu-open');
          menuToggle.classList.remove('active');
      });
  });
}