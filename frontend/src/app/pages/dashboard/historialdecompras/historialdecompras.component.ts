import { NgComponentOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecimalFormatPipe } from '../../../shared/pipes/decimal-format.pipe';
import { DetalleService } from '../../../core/services/detalle.service';
import { ReactiveFormsModule } from '@angular/forms';
//import { Detalle } from '../../../shared/interfaces/detalle.data';
import { Detalle,Compra } from '../../../shared/interfaces/compra';
import { CompraService } from '../../../core/services/compra.service';

@Component({
  selector: 'app-historialdecompras',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historialdecompras.component.html',
  styleUrls: ['./historialdecompras.component.css']
})
export class HistorialdecomprasComponent implements OnInit {
[x: string]: any;
  getDetalle: Detalle[] = [];
  getCompra: Compra[] = [];  // Propiedad para almacenar las compras

  constructor(
    private detalleService: DetalleService,
    private compraService: CompraService // Inyecta el servicio de compras
  ) { }

  ngOnInit(): void {
    this.obtenerDetalles();
    this.obtenerCompras(); // Llama al método para cargar las compras
  }

  obtenerDetalles(): void {
    this.detalleService.getDetalle().subscribe(
      (data: Detalle[]) => {  
        this.getDetalle = data;
      },
      (error) => {
        console.error('Error al obtener los detalles:', error);
      }
    );
  }

  obtenerCompras(): void {
    this.compraService.getCompras().subscribe(  // Cambié de `getCompra()` a `getCompras()`
      (data: Compra[]) => {
        this.getCompra = data;
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }
}
