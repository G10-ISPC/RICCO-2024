// dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { CompraGralService} from '../../core/services/compra-gral.service';  // Ajusta la ruta
import { Compra } from '../../shared/interfaces/compra';  // Ajusta la ruta

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showAdmin = false;
  showCompras = false;
  compras: Compra[] = [];

  constructor(private compraGralService: CompraGralService) {}

  showAdminComponent() {
    this.showAdmin = true;
    this.showCompras = false;
  }

  showComprasComponent() {
    this.showAdmin = false;
    this.showCompras = true;
    this.compraGralService.getCompras().subscribe(data => {
      this.compras = data;
      console.log(`Compras recuperadas:`, this.compras); 
    });
  }
}
