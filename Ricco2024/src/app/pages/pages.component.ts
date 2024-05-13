import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
// interface Product {
//   name: string;
//   price: string;
//   img: string;
// }

// function addClickEvents(): void {
//   const buyButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.buy-button');
//   buyButtons.forEach(button => {
//     button.addEventListener('click', addToCart);
//   });
// }

// document.addEventListener('DOMContentLoaded', addClickEvents);

// function addToCart(event: MouseEvent): void {
//   event.preventDefault();

//   const productId: string | null = (event.target as HTMLElement).getAttribute('data-product');

//   if (productId) {
//     const productName: string = document.querySelector(`#${productId} .card__front h2`)?.textContent || '';
//     const productPrice: string = document.querySelector(`#${productId} .card__back .price`)?.textContent || '';

//     const backgroundStyle: string | undefined = window.getComputedStyle(document.querySelector(`#${productId} .card__front`)).backgroundImage;
//     const imageUrl: string | undefined = backgroundStyle?.replace('url("', '').replace('")', '');

//     if (imageUrl) {
//       const productImage: HTMLImageElement = new Image();
//       productImage.src = imageUrl;
//       productImage.alt = 'Foto del producto';

//       const product: Product = {
//         name: productName,
//         price: productPrice,
//         img: productImage.outerHTML,
//       };

//       let cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];

//       cart.push(product);

//       localStorage.setItem('cart', JSON.stringify(cart));

//       updateCartUI();
//     }
//   }
// }

// function removeFromCart(productName: string): void {
//   let cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];

//   const index: number = cart.findIndex(item => item.name === productName);

//   if (index !== -1) {
//     cart.splice(index, 1); 
//   }

//   localStorage.setItem('cart', JSON.stringify(cart));

//   updateCartUI();
// }

// function updateCartUI(): void {
//   const cartItems: HTMLElement | null = document.getElementById('cart-items');
//   if (cartItems) {
//     cartItems.innerHTML = '';

//     const cart: Product[] = JSON.parse(localStorage.getItem('cart')) || [];

//     cart.forEach(item => {
//       const row: HTMLTableRowElement = document.createElement('tr');
//       row.innerHTML = `
//         <td>${item.name}</td>
//         <td>${item.img}</td> <!-- Mostrar la imagen del producto -->
//         <td>1</td>
//         <td>${item.price}</td>
//         <td>${item.price}</td>
//         <td><button class="remove-button">Eliminar</button></td>
//       `;
//       cartItems.appendChild(row);

//       const images: NodeListOf<HTMLImageElement> = row.querySelectorAll('img');
//       images.forEach(img => {
//         img.style.width = '20%'; 
//         img.style.height = 'auto'; 
//         img.style.display = 'block'; 
//         img.style.margin = 'auto'; 
//       });

//       const removeButton: HTMLButtonElement | null = row.querySelector('.remove-button');
//       if (removeButton) {
//         removeButton.addEventListener('click', () => removeFromCart(item.name));
//       }
//     });

//     const cartTotal: HTMLElement | null = document.getElementById('cart-total');
//     if (cartTotal) {
//       const total: number = cart.reduce((acc, item) => acc + parseInt(item.price.replace('$', '')), 0);
//       cartTotal.textContent = `Total: $${total}`;
//     }
//   }
// }

// document.addEventListener('DOMContentLoaded', addClickEvents);

// window.addEventListener('load', updateCartUI);

// const clearCartButton: HTMLElement | null = document.getElementById('clear-cart');
// if (clearCartButton) {
//   clearCartButton.addEventListener('click', () => {
//     localStorage.removeItem('cart');
//     updateCartUI();
//   });
// }


}
