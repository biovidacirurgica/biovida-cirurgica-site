document.addEventListener("DOMContentLoaded", async function () {
  try {
    const pricesPath =
      document.body.dataset.pricesPath || "dados/precos.json";

    const response = await fetch(pricesPath);

    if (!response.ok) {
      throw new Error(
        `Erro ao carregar os dados: ${response.status}`
      );
    }

    const products = await response.json();

    const productElements = document.querySelectorAll(
      "[data-product-id]"
    );

    productElements.forEach(function (productElement) {
      const productId = productElement.dataset.productId;
      const productData = products[productId];

      if (!productData) {
        console.warn(
          `Produto não encontrado no JSON: ${productId}`
        );

        return;
      }

      const oldPrice = productElement.querySelector(
        "[data-price-old]"
      );

      const currentPrice = productElement.querySelector(
        "[data-price-current]"
      );

      const installments = productElement.querySelector(
        "[data-installments]"
      );

      const ratingStars = productElement.querySelector(
        "[data-rating-stars]"
      );

      const reviewCount = productElement.querySelector(
        "[data-review-count]"
      );

      const productCode = productElement.querySelector(
        "[data-product-code]"
      );

      if (oldPrice) {
        oldPrice.textContent =
          `R$ ${productData.precoAnterior}`;
      }

      if (currentPrice) {
        currentPrice.innerHTML =
          `<span>R$</span> ${productData.precoAtual}`;
      }

      if (installments) {
        installments.textContent =
          `ou em até 6x de R$ ` +
          `${productData.valorParcela} sem juros.`;
      }

      if (ratingStars) {
        const rating = Number(productData.avaliacao);

        const validRating = Math.min(
          Math.max(rating, 0),
          5
        );

        const fullStars = "★".repeat(validRating);
        const emptyStars = "☆".repeat(5 - validRating);

        ratingStars.textContent =
          fullStars + emptyStars;
      }

      if (reviewCount) {
        reviewCount.textContent =
          `(${productData.quantidadeAvaliacoes})`;
      }

      if (productCode) {
        productCode.textContent =
          `Código: ${productData.codigo}`;
      }
    });

    console.log(
      "Preços, avaliações e códigos aplicados com sucesso."
    );
  } catch (error) {
    console.error(
      "Não foi possível carregar os dados dos produtos:",
      error
    );
  }
});