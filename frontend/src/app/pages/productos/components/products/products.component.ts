import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/products.data';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../../../core/services/cart.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { DecimalFormatPipe } from '../../../../shared/pipes/decimal-format.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, DecimalFormatPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.productoService.obtenerCard().subscribe(
      (data: Product[]) => {
        this.products = data.map(producto => {
          if (!producto.id) {
            producto.id = this.generateUniqueId(); // Genera un ID único si no tiene uno
          }
          console.log('Tipo y valor de precio:', typeof producto.precio, producto.precio);
          if (typeof producto.precio !== 'number') {
            console.warn('Producto con precio inválido en el componente:', producto);
            producto.precio = parseFloat(producto.precio) || 0;
          }
        
          return producto;
        });
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
  
  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  onAdd(product: Product) {
    this.cartService.addItem({
      id_producto: product.id_producto,
      nombre_producto: product.nombre_producto,
      imgUrl: product.imgUrl,
      precio: product.precio,
      quantity: 1,
    });
  }
}
