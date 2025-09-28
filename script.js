// === Reveal on scroll ===
function revealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();

  const logo = document.querySelector('.logo');
  if (logo) logo.classList.add('visible');
});

// === Modal Logic ===
window.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById('openModal');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close-btn');

  if (openModal && modal && closeModal) {
    openModal.addEventListener("click", () => {
      modal.classList.add("show");
      modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => modal.style.display = "none", 300);
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
      }
    });
  }
});

// Fullscreen Overlay Menu
const menuButton = document.getElementById("menuButton");
const overlayMenu = document.getElementById("overlayMenu");
const closeBtn = document.querySelector(".overlay-menu .close-btn");

if (menuButton && overlayMenu && closeBtn) {
  menuButton.addEventListener("click", () => {
    overlayMenu.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    overlayMenu.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === overlayMenu) {
      overlayMenu.classList.remove("show");
    }
  });
}
