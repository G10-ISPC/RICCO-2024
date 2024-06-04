import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LogRequest } from '../data/logRequest';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiUrl = 'http://127.0.0.1:8000/api/v1login';

  constructor(private http: HttpClient) { }
  // ver de donde sacar el usuario y agregarlo a any
  
  login(_credentials: LogRequest): Observable<User>{
   
    return this.http.get<User>(this.apiUrl).pipe(
      catchError(this.handleError)
    )

  }

  private handleError (error: HttpErrorResponse): Observable<never>{
    if(error.status===0){
      console.error("Se ha producido un error", error.error);
    }
    else{
      console.error("backend retoro el código de estado", error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló, por favor intente nuevamente"));
  }
}
