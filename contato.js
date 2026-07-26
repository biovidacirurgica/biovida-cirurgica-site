"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".contact-carousel__slide")];
  const dots = [...document.querySelectorAll(".contact-carousel__dot")];
  if (slides.length < 2) return;

  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.classList.toggle("is-visible", position === current);
    });
    dots.forEach((dot, position) => {
      const active = position === current;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const start = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(current + 1), 4500);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      start();
    });
  });

  showSlide(0);
  start();
});
