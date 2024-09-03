import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../../shared/interfaces/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private Url = '/api/compra/';

  constructor(private http: HttpClient) { }

  // Registrar una nueva compra
  registrarCompra(compra: Compra): Observable<Compra> {
    // Captura la fecha y hora actual al momento de enviar la solicitud POST
    compra.fecha = new Date();  // Esto asume que en tu interfaz 'Compra' tienes un campo 'fecha' de tipo Date

    return this.http.post<Compra>(this.Url, compra);
  }



  // Opcional: Obtener todos las compras
  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.Url);
  }

  // Opcional: Obtener una compra por su ID
  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.Url}${id}/`);
  }

  // Opcional: Actualizar una compra por su ID
  actualizarCompra(id: number, compra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.Url}${id}/`, compra);
  }

  // Opcional: Eliminar una compra por su ID
  eliminarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.Url}${id}/`);
  }
}



