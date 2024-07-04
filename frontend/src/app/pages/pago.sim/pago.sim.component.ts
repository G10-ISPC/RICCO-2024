import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../../shared/interfaces/compra'; // Asegúrate de importar la interfaz Compra
import { DecimalFormatPipe } from '../../shared/pipes/decimal-format.pipe';

@Component({
  selector: 'app-pago-sim',
  standalone: true,
  imports: [CommonModule, DecimalFormatPipe],
  templateUrl: './pago.sim.component.html',
  styleUrls: ['./pago.sim.component.css']
})
export class PagoSimComponent {
  compra: Compra = {
    descripcion: '',
    precio_total: 0,
    user_id: '',
    detalles: [],
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    fecha: new Date() // Inicializa la fecha con el valor actual
  };

  cartItems: CartItem[];
  total: number;
  cardNumber: string = '';
  expDate: string = '';
  cvv: string = '';

  constructor(private cartService: CartService, private http: HttpClient) {
    this.cartItems = this.cartService.cart().items;
    this.total = this.cartService.cart().total;
  }

  onCheckout() {
    const compra = {
      descripcion: 'Compra de productos',
      precio_total: this.total,
      detalles: this.cartItems.map(item => ({
        cantidad: item.quantity,
        precio_calculado: item.precio * item.quantity,
        producto: item.id_producto
      })),
      fecha: this.compra.fecha // Incluye la fecha en el objeto de compra
    };

    this.http.post('/api/compra/', compra).subscribe(response => {
      console.log('Compra realizada con éxito', response);
      alert('Compra realizada con éxito');
      this.cartService.clearCart();
    }, error => {
      console.error('Error al realizar la compra', error);
      alert('Error al realizar la compra');
    });
  }
}
  
