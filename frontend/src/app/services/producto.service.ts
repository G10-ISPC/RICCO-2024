import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../data/products.data'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url="http://127.0.0.1:8000/api/v1producto/"; 
  
  constructor(private http:HttpClient) { 

    
  }
  
  createProduct(product:Product):Observable<any>
  
    {
     return this.http.post(this.url, product)
    }
}

