// === Filter ===
const filterItems = document.querySelectorAll(".sidebar a[data-category]");
const cards = Array.from(document.querySelectorAll(".card"));
const grid = document.querySelector(".catalogue-grid");

// === Split-Flap переход с независимым и рандомным перебором ===
function splitFlapTransition(finalCards) {
  const visibleCards = Array.from(finalCards);
  const allImages = visibleCards.map(c => c.querySelector("img").src);

  // создаём половинки
  visibleCards.forEach(card => {
    const img = card.querySelector("img");
    const originalSrc = img.src;

    const topHalf = document.createElement("div");
    const bottomHalf = document.createElement("div");
    topHalf.className = "split-top";
    bottomHalf.className = "split-bottom";

    topHalf.style.backgroundImage = `url(${originalSrc})`;
    bottomHalf.style.backgroundImage = `url(${originalSrc})`;

    card.appendChild(topHalf);
    card.appendChild(bottomHalf);
    img.style.opacity = "0"; // скрываем оригинал
  });

  const flips = 6 + Math.floor(Math.random() * 3); // количество "щёлчков"
  let count = 0;

  const flipInterval = setInterval(() => {
    visibleCards.forEach((card, i) => {
      const topHalf = card.querySelector(".split-top");
      const bottomHalf = card.querySelector(".split-bottom");

      // 🔹 независимо выбираем случайные картинки
      const randomImgTop = allImages[Math.floor(Math.random() * allImages.length)];
      const randomImgBottom = allImages[Math.floor(Math.random() * allImages.length)];

      topHalf.style.backgroundImage = `url(${randomImgTop})`;
      bottomHalf.style.backgroundImage = `url(${randomImgBottom})`;

      // создаём эффект механического перелистывания
      topHalf.style.transform = "rotateX(-90deg)";
      bottomHalf.style.transform = "rotateX(90deg)";

      setTimeout(() => {
        topHalf.style.transform = "rotateX(0deg)";
        bottomHalf.style.transform = "rotateX(0deg)";
      }, 100);
    });

    count++;
    if (count >= flips) {
      clearInterval(flipInterval);

      // финальные картинки
      visibleCards.forEach(card => {
        const img = card.querySelector("img");
        const topHalf = card.querySelector(".split-top");
        const bottomHalf = card.querySelector(".split-bottom");
        const finalSrc = img.src;

        topHalf.style.backgroundImage = `url(${finalSrc})`;
        bottomHalf.style.backgroundImage = `url(${finalSrc})`;

        setTimeout(() => {
          img.style.opacity = "1";
          topHalf.remove();
          bottomHalf.remove();
        }, 150);
      });
    }
  }, 50); // 🔹 скорость щелчков (меньше = быстрее)
}

// === Показ карточек ===
function showCards(category) {
  cards.forEach(card => (card.style.display = "none"));

  let filtered = [];
  if (category === "all") {
    filtered = [...cards].sort(() => Math.random() - 0.5);
  } else {
    filtered = cards.filter(card => card.dataset.category === category);
  }

  grid.innerHTML = "";
  filtered.forEach(card => {
    card.style.display = "flex";
    grid.appendChild(card);
  });

  splitFlapTransition(filtered);
}

// === Меню ===
filterItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const category = item.getAttribute("data-category");
    showCards(category);
  });
});

// === При загрузке страницы ===
document.addEventListener("DOMContentLoaded", () => {
  showCards("all");
});

// === Modal ===
const modal = document.getElementById("artistModal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalGenre = document.getElementById("modal-genre");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.querySelector("img").src;
    modalName.textContent = card.querySelector(".card-name").textContent;
    modalGenre.textContent = card.dataset.genre;
    modalLink.href = card.dataset.link;
    modalLink.style.display = card.dataset.link ? "inline-block" : "none";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// === Сообщение при загрузке ===
window.addEventListener("load", () => {
  const msg = document.getElementById("catalogue-message");
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 6000);
});
