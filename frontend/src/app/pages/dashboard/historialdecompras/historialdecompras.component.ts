import { NgComponentOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecimalFormatPipe } from '../../../shared/pipes/decimal-format.pipe';
import { DetalleService } from '../../../core/services/detalle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Detalle } from '../../../shared/interfaces/detalle.data';
import { Product } from '../../../shared/interfaces/products.data';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-historialdecompras',
  standalone: true,
  imports: [AsyncPipe, NgComponentOutlet,DecimalFormatPipe, CommonModule, ReactiveFormsModule ],
  templateUrl: './historialdecompras.component.html',
 styleUrls: ['./historialdecompras.component.css'] 
})
export class HistorialdecomprasComponent implements OnInit {
  // producto: Product = new Product();
  // detalle: Detalle = new Detalle();
  getDetalle: Detalle[] = [];
  getProducto: Product[] = [];

  constructor(private detalleService: DetalleService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerDetalles();
  }

  obtenerDetalles(): void {
    this.detalleService.getDetalle().subscribe((data: Detalle[]) => {  // Cambiado a Detalle[]
      this.getDetalle = data;
    }, (error) => {
      console.error('Error al obtener los detalles:', error);
    });
  }
}