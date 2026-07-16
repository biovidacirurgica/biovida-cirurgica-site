// Troca a foto principal do produto ao clicar em uma miniatura
document.addEventListener('DOMContentLoaded', function () {
  const mainPhoto = document.getElementById('product-main-photo');
  const thumbButtons = document.querySelectorAll('.product-detail__thumb-btn');

  if (!mainPhoto || !thumbButtons.length) return;

  thumbButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const thumbImg = button.querySelector('img');
      if (!thumbImg) return;

      mainPhoto.src = thumbImg.src;

      thumbButtons.forEach(function (btn) {
        btn.classList.remove('is-active');
      });
      button.classList.add('is-active');
    });
  });
});
