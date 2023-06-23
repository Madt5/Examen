document.addEventListener('DOMContentLoaded', function () {
  //Создание Корзины
  const cartButton = document.createElement("button");
  cartButton.classList.add("cart-button");
  const cartImage = document.createElement("img");
  cartImage.src = 'images/photo_5238127116632052474_m.jpg';
  cartButton.appendChild(cartImage);
  document.body.appendChild(cartButton);

  cartButton.addEventListener("click", () => {
    // Переход на страницу корзины
    window.location.href = "cart.html";
  });

  const cartContainer = document.getElementById("cart-container");

  //Функция для отображения товаров в корзине
  function displayCartItems(items) {
    cartContainer.innerHTML = "";

    items.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      const img = document.createElement("img");
      img.src = item.image;
      img.classList.add("cart-item-img");

      const nameElement = document.createElement("h3");
      nameElement.textContent = item.title;
      nameElement.classList.add("cart-item-title");

      const quantityElement = document.createElement("p");
      quantityElement.textContent = `Количество: ${item.quantity}`;
      quantityElement.classList.add("cart-item-quantity");

      const priceElement = document.createElement("p");
      priceElement.textContent = `Цена: $${item.price}`;
      priceElement.classList.add("cart-item-price");

      cartItem.appendChild(img);
      cartItem.appendChild(nameElement);
      cartItem.appendChild(quantityElement);
      cartItem.appendChild(priceElement);

      cartContainer.appendChild(cartItem);
    });
  }

  //Получение данных о корзине 
  const userBasket = JSON.parse(localStorage.getItem("userBasket")) || [];

  displayCartItems(userBasket);

  //Функция для добавления товара в корзину
  function addToCart(product) {
    const existingProduct = userBasket.find((item) => item.title === product.title);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      userBasket.push({
        title: product.title,
        quantity: 1,
        image: product.image,
        price: product.price,
      });
    }
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
  }
});
