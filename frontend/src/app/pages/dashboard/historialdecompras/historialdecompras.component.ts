import { NgComponentOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleService } from '../../../core/services/detalle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Detalle } from '../../../shared/interfaces/detalle.data';
import { Product } from '../../../shared/interfaces/products.data';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-historialdecompras',
  standalone: true,
  imports: [AsyncPipe, NgComponentOutlet, CommonModule, ReactiveFormsModule ],
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
    // Suscripción al Observable devuelto por getDetalle
    this.detalleService.getDetalle().subscribe((data: Detalle[]) => {
      this.getDetalle = data;
    });

    // // Suscripción al Observable devuelto por getProducto
    // this.productoService.getProducto().subscribe((data: any) => {
    //   this.getProducto = data;
    // });
  }
}