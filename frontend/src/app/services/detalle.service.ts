import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detalle } from '../data/detalle.data';



@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private url="/api/detalle/"; 
  
  constructor(private http:HttpClient) {    
  }
  
  getDetalle():Observable<Detalle[]>{
     return this.http.get<Detalle[]>(this.url);
    }
}
