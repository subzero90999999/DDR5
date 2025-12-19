const productsContainer = document.getElementById("products");
let allProducts = [];

 async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  allProducts = data;
  renderProducts(data);

}

 function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.map(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.title}</h3>
      <p>Цена: $${product.price}</p>
      <p>Рейтинг: ${product.rating.rate}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Добавить в корзину</button>
      <button onclick="editProduct(${product.id})">Редактировать</button>
    `;

    productsContainer.appendChild(div);
  });
}

 function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Товар добавлен в корзину");

}

 document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    image: "https://i.pravatar.cc",
    category: "electronics"

  };

  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json"
    }

  });

  const data = await res.json();
  alert("Товар добавлен!");
  console.log("Создан товар:", data);
    getProducts();

});

 async function editProduct(id) {
  const newPrice = prompt("Введите новую цену:");

  if (!newPrice) return;

  await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ price: Number(newPrice) }),
    headers: {
      "Content-Type": "application/json"
    }

  });

  alert("Цена обновлена");
  getProducts();    

}

 document.getElementById("filterBtn").addEventListener("click", () => {
  const min = Number(minPrice.value) || 0;
  const max = Number(maxPrice.value) || Infinity;

  const filtered = allProducts.filter(
    p => p.price >= min && p.price <= max
  );

  renderProducts(filtered);
  
});

getProducts();
