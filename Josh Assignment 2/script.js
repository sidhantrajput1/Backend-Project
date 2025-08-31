
  const container = document.querySelector(".testimonial-container");
  const dots = document.querySelectorAll(".dot");
  const cards = document.querySelectorAll(".testimonial-card");
  const totalSlides = cards.length;

  let currentIndex = 0;
  let slideInterval;

  function updateSlider(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    currentIndex = index;
    const offset = -currentIndex * 100; // move by 100% each slide
    container.style.transform = `translateX(${offset}%)`;

    // update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
      dot.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
    });
  }

  // auto-slide
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 5000);
  }

  // dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      updateSlider(i);
      startAutoSlide();
    });
  });

  // init
  // updateSlider(0);
  // startAutoSlide();



const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
    nav.classList.remove('open');
  }
});
