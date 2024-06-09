import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../services/cart.service';
import { AmountAdjusterComponent } from "../amount-adjuster/amount-adjuster.component";
import { CartComponent } from '../../cart.component';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-cart-item-card',
    standalone: true,
    templateUrl: './cart-item-card.component.html',
    styleUrl: './cart-item-card.component.css',
    imports: [DecimalPipe, AmountAdjusterComponent, CartComponent]
    // CartComponent, 
})

export class CartItemCardComponent {

  @Input() item!: CartItem;
  @Output() itemQuantityUpdate = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();
  
  onQuantityChange(quantity: number) {
    this.itemQuantityUpdate.next(quantity);
  }

  onRemoveItem() {
    this.removeItem.next();
  }

}


