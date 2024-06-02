import { Component, NgModule, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
// import { DetalleService } from '../detalle.service';
// import { DetalleCompra } from '../interfaces/detallecompra';
// import { Observable } from 'rxjs';
import { NgComponentOutlet } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
// import { NgFor } '@angular/common';


@Component({
  selector: 'app-comprasrecientes',
  standalone: true,
  imports: [DashboardComponent, AsyncPipe, NgComponentOutlet, CommonModule],
  templateUrl: './comprasrecientes.component.html',
  styleUrl: './comprasrecientes.component.css'
})
export class ComprasrecientesComponent{}
// export class ComprasrecientesComponent implements OnInit {
//   public detalleCompra$!: Observable<DetalleCompra[]>;
//   constructor(private service: DetalleService){ 
//   }
//   ngOnInit(): void {
//     this.detalleCompra$ = this.service.getDetalle();
      
//   }


