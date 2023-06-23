document.addEventListener('DOMContentLoaded', function () {
  //Сортировка
  const categorySelect = document.querySelector('.categorySelect');
  const sortBtn = document.querySelector('.sortBtn');
  //Отображение каталога
  const catalogContainer = document.getElementById('catalog-container');
  //Функция для создания товара в каталоге
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    const img = document.createElement('img');
    img.classList.add('product-img')
    img.src = product.image;

    const nameElement = document.createElement('h3');
    nameElement.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Добавить в корзину';

    addToCartBtn.addEventListener('click', () => {
      addToCart(product);
    });

    productElement.appendChild(img);
    productElement.appendChild(nameElement);
    productElement.appendChild(price);
    productElement.appendChild(addToCartBtn);

    return productElement;
  }

  //Функция для отображения каталога
  function displayCatalog(products) {
    if (catalogContainer) {
      catalogContainer.innerHTML = '';

      products.forEach((product) => {
        const productElement = createProductElement(product);
        catalogContainer.appendChild(productElement);
      });
    }
  }

  //Функция для сортировки товаров по категориям
  function filterByCategory(category, products) {
    if (category === '') {
      return products;
    }
    return products.filter((product) => product.category === category);
  }

  sortBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = filterByCategory(selectedCategory, data);
        displayCatalog(filteredProducts);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  });

  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
      displayCatalog(data);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных:', error);
    });

});