import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../data/products.data'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url="http://127.0.0.1:8000/api/producto/"; 
  
  constructor(private http:HttpClient) { 

    
  }

  public getData () : Observable<any>{
    return this.http.get<any>(this.url)
  }
  
  deleteData(id: string): Observable<any> {
    const urldel = `${this.url}${id}/`; 
    return this.http.delete(urldel);
  }

  createProduct(product:Product):Observable<any>
  
    {
     return this.http.post(this.url, product)
    }

   
  
}

