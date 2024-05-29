import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../data/products.data';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { CommonModule } from '@angular/common';
// import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TruncatePipe, CommonModule],
  // , ProductsComponent
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  onAdd() {
    this.add.next(this.product);
  }
}