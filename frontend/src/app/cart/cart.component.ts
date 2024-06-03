import { Component, computed } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { ProductosComponent } from '../productos/productos.component';
import { AmountAdjusterComponent } from './components/amount-adjuster/amount-adjuster.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemCardComponent, ProductosComponent, AmountAdjusterComponent, CartComponent, RouterModule, RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

  constructor(private cartService: CartService) {}

  onItemQuantityUpdate(quantity: number, id: string) {
    let increase = true;
    const item = this.items().find((t) => t.id === id);
    if (quantity < item!.quantity) increase = false;
    if (increase) {
      this.cartService.increaseItem(item!);
    } else {
      this.cartService.decreaseItem(item!);
    }
  }

  onRemoveItem(id: string) {
    const item = this.items().find((t) => t.id === id);
    this.cartService.removeItem(item!);
  }

}
