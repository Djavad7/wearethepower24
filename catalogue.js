// === Filter ===
const filterItems = document.querySelectorAll(".sidebar a[data-category]");
const cards = document.querySelectorAll(".card");

filterItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const category = item.getAttribute("data-category");

    cards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
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
    modalLink.style.display = card.dataset.link ? "inline-block" : "none"; // если ссылки нет — кнопка скрыта
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

window.addEventListener("load", () => {
  const msg = document.getElementById("catalogue-message");
  msg.classList.add("show");

  // держим сообщение 4 секунды и убираем
  setTimeout(() => {
    msg.classList.remove("show");
  }, 6000);
});
