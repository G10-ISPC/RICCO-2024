import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../../shared/interfaces/products.data'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url="api/producto/"; 
  
  constructor(private http:HttpClient) { 

    
  }

  public getData () : Observable<any>{
    return this.http.get<any>(this.url)
  }
  
  deleteData(id: string): Observable<any> {
    const urldel = `http://127.0.0.1:8000/${this.url}${id}/`; 
    return this.http.delete(urldel);
  }

  createProduct(product:Product):Observable<any>
  
    {
     return this.http.post(this.url, product)
    }

  getProducto():Observable<Product[]>{
      return this.http.get<Product[]>(this.url);
     }
   
  
}

