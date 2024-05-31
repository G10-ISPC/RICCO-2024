import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';


import { ProductosComponent } from '../productos/productos.component';
import { HistorialdecomprasComponent } from './historialdecompras/historialdecompras.component';
import { ComprasrecientesComponent } from './comprasrecientes/comprasrecientes.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ProductosComponent, HistorialdecomprasComponent, ComprasrecientesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
