const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const closeFooterBtn = document.getElementById("closeFooterBtn");

function openModal() {
  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = ""; // restore scroll
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
closeFooterBtn.addEventListener("click", closeModal);

// Close on backdrop click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
