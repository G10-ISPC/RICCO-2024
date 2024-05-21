
function addClickEvents() {
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

document.addEventListener('DOMContentLoaded', addClickEvents);

function addToCart(event) {
  event.preventDefault();

  const productId = event.target.getAttribute('data-product');

  const productName = document.querySelector(`#${productId} .card__front h2`).textContent;
  const productPrice = document.querySelector(`#${productId} .card__back .price`).textContent;

  const backgroundStyle = window.getComputedStyle(document.querySelector(`#${productId} .card__front`)).backgroundImage;
  const imageUrl = backgroundStyle.replace('url("', '').replace('")', '');

  const productImage = document.createElement('img');
  productImage.src = imageUrl;
  productImage.alt = 'Foto del producto';

  const product = {
    name: productName,
    price: productPrice,
    img: productImage.outerHTML, 
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartUI();
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cart.findIndex(item => item.name === productName);

  if (index !== -1) {
    cart.splice(index, 1); 
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.img}</td> <!-- Mostrar la imagen del producto -->
      <td>1</td>
      <td>${item.price}</td>
      <td>${item.price}</td>
      <td><button class="remove-button">Eliminar</button></td>
    `;
    cartItems.appendChild(row);

        const images = row.querySelectorAll('img');
        images.forEach(img => {
          img.style.width = '20%'; 
          img.style.height = 'auto'; 
          img.style.display = 'block'; 
          img.style.margin = 'auto'; 
        });

    const removeButton = row.querySelector('.remove-button');
    removeButton.addEventListener('click', () => removeFromCart(item.name));
  });

  const cartTotal = document.getElementById('cart-total');
  const total = cart.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')), 0);
  cartTotal.textContent = `Total: $${total}`;
}

document.addEventListener('DOMContentLoaded', addClickEvents);

window.addEventListener('load', updateCartUI);

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
  localStorage.removeItem('cart');
  updateCartUI();
});




