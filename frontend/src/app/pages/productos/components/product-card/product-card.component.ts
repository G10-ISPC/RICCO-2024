import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../shared/interfaces/products.data';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../../../cart/cart.component';
import { CartService } from '../../../../core/services/cart.service';
import { DecimalFormatPipe } from '../../../../shared/pipes/decimal-format.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TruncatePipe, CommonModule, CartComponent, DecimalFormatPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  onAdd(product: Product) {
    this.cartService.addItem({
      id_producto: product.id_producto,
      nombre_producto: product.nombre_producto,
      imgUrl: product.imgUrl,
      precio: product.precio,
      quantity: 1,
    });
    // this.add.emit(product);
  }
}
