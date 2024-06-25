import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HistorialdecomprasComponent } from './historialdecompras/historialdecompras.component';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    HistorialdecomprasComponent,
    ProductosComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[]
})
export class DashboardComponent {

}
