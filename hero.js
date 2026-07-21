(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const heroSlideshow = document.getElementById("hero-slideshow");

    if (!heroSlideshow) {
      return;
    }

    const settings = {
      images: [
        {
          src: "img-hero/hero-biovida.png",
          alt: "Fachada da loja BioVida Cirúrgica",
          position: "center",
        },
        {
          src: "img-hero/hero-biovida_tarde.png",
          alt: "Fachada da BioVida Cirúrgica durante a tarde",
          position: "center",
        },
        {
          src: "img-hero/hero-biovida_estacionamento.png",
          alt: "Fachada e estacionamento da BioVida Cirúrgica",
          position: "center",
        },
      ],

      delay: 5000,
      transitionDuration: 800,
    };

    let currentPosition = 0;
    let previousPosition = 0;

    const slides = [];

    const originalPhoto =
      heroSlideshow.querySelector(".hero__photo");

    settings.images.forEach(function (image, index) {
      const slide = document.createElement("img");

      slide.src = image.src;
      slide.alt = image.alt;
      slide.classList.add("hero__slide");
      slide.style.objectPosition = image.position;

      if (index === 0) {
        slide.classList.add("is-visible");
      }

      heroSlideshow.appendChild(slide);
      slides.push(slide);
    });

    if (originalPhoto) {
      originalPhoto.remove();
    }

    function changeHeroImage() {
      previousPosition = currentPosition;

      currentPosition =
        (currentPosition + 1) % slides.length;

      slides[currentPosition].classList.add("is-visible");

      setTimeout(function () {
        slides[previousPosition].classList.remove("is-visible");
      }, settings.transitionDuration);
    }

    if (slides.length > 1) {
      setInterval(changeHeroImage, settings.delay);
    }
  });
})();