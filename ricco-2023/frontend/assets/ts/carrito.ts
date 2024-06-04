// Interfaz para el producto
interface Product {
    name: string;
    price: string;
    img: string;
  }
  
  // Función para agregar eventos de clic a los botones de compra
  function addClickEvents(): void {
    const buyButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }
  
  // Ejecutar la función addClickEvents después de que la página se haya cargado completamente
  document.addEventListener('DOMContentLoaded', addClickEvents);
  
  // Función para agregar al carrito
  function addToCart(event: MouseEvent): void {
    // Evitar el comportamiento predeterminado del enlace
    event.preventDefault();
  
    // Obtener el ID del producto desde el atributo data-product
    const productId: string | null = (event.target as HTMLElement).getAttribute('data-product');
  
    if (productId) {
      // Obtener el nombre y precio del producto
      const productName: string = document.querySelector(`#${productId} .card__front h2`)?.textContent || '';
      const productPrice: string = document.querySelector(`#${productId} .card__back .price`)?.textContent || '';
  
      // Obtener la URL de la imagen de fondo
      const backgroundStyle: string | undefined = window.getComputedStyle(document.querySelector(`#${productId} .card__front`)).backgroundImage;
      const imageUrl: string | undefined = backgroundStyle?.replace('url("', '').replace('")', '');
  
      if (imageUrl) {
        // Crear el elemento <img> con la imagen de fondo
        const productImage: HTMLImageElement = new Image();
        productImage.src = imageUrl;
        productImage.alt = 'Foto del producto';
  
        // Crear un objeto con los detalles del producto
        const product: Product = {
          name: productName,
          price: productPrice,
          img: productImage.outerHTML, // Agregar el HTML de la imagen al objeto
        };
  
        // Obtener el carrito de localStorage o crear uno nuevo si no existe
        let cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];
  
        // Agregar el producto al carrito
        cart.push(product);
  
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
  
        // Actualizar la interfaz del carrito
        updateCartUI();
      }
    }
  }
  
  // Función para eliminar un producto del carrito
  function removeFromCart(productName: string): void {
    // Obtener el carrito de localStorage
    let cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Encontrar el primer índice del producto con el nombre dado
    const index: number = cart.findIndex(item => item.name === productName);
  
    // Si se encontró el producto, eliminarlo del carrito
    if (index !== -1) {
      cart.splice(index, 1); // Eliminar solo un elemento en el índice encontrado
    }
  
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Actualizar la interfaz del carrito
    updateCartUI();
  }
  
  // Función para actualizar la interfaz del carrito
  function updateCartUI(): void {
    const cartItems: HTMLElement | null = document.getElementById('cart-items');
    if (cartItems) {
      cartItems.innerHTML = '';
  
      // Obtener el carrito de localStorage
      const cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Recorrer el carrito y agregar cada producto a la interfaz
      cart.forEach(item => {
        const row: HTMLTableRowElement = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.img}</td> <!-- Mostrar la imagen del producto -->
          <td>1</td>
          <td>${item.price}</td>
          <td>${item.price}</td>
          <td><button class="remove-button">Eliminar</button></td>
        `;
        cartItems.appendChild(row);
  
        // Establecer el estilo de las imágenes al 20% de su tamaño original
        const images: NodeListOf<HTMLImageElement> = row.querySelectorAll('img');
        images.forEach(img => {
          img.style.width = '20%'; // Tamaño del 20% de la imagen original
          img.style.height = 'auto'; // Mantener la proporción de aspecto
          img.style.display = 'block'; // Mostrar como bloque para centrar
          img.style.margin = 'auto'; // Centrar horizontalmente
        });
  
        // Agregar evento de clic al botón de eliminar
        const removeButton: HTMLButtonElement | null = row.querySelector('.remove-button');
        if (removeButton) {
          removeButton.addEventListener('click', () => removeFromCart(item.name));
        }
      });
  
      // Calcular y mostrar el total
      const cartTotal: HTMLElement | null = document.getElementById('cart-total');
      if (cartTotal) {
        const total: number = cart.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')), 0);
        cartTotal.textContent = `Total: $${total}`;
      }
    }
  }
  
  // Ejecutar la función addClickEvents después de que la página se haya cargado completamente
  document.addEventListener('DOMContentLoaded', addClickEvents);
  
  // Cargar el carrito al cargar la página
  window.addEventListener('load', updateCartUI);
  
  // Limpiar el carrito al hacer clic en "Vaciar Carrito"
  const clearCartButton: HTMLElement | null = document.getElementById('clear-cart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      localStorage.removeItem('cart');
      updateCartUI();
    });
  }
  