import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/products.data';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = "api/producto/";
  private baseImgUrl = '../assets/img/'; // URL base de las imágenes locales

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  deleteData(id: string): Observable<any> {
    const urldel = `http://127.0.0.1:8000/${this.url}${id}/`;
    return this.http.delete(urldel);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.url, product);
  }

  getProducto(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  obtenerCard(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map(productos => {
        // Verificación de IDs únicos
        const ids = new Set();
        return productos.map((producto, index) => {
          if (ids.has(producto.id_producto)) {
            console.warn('Producto con ID duplicado:', producto);
          } else {
            ids.add(producto.id_producto);
          }
  
          // Verificación y conversión del precio
          if (typeof producto.precio === 'string') {
            producto.precio = parseFloat(producto.precio);
          }
          producto.imgUrl = this.baseImgUrl + `bur${index + 1}.jpg`;
  
          return producto;
        });
      })
    );
  }
}
   
  


