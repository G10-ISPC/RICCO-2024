import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LogRequest } from '../data/logRequest';
import { User } from '../data/user';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiUrl = 'api/v1login';
  private readonly TOKEN_KEY= "token" //aqui cree una constante TOKEN_KEY cada vez que quiera saber si estoy logueada voy a consultar esta variable
  private readonly isUserLogin$= new BehaviorSubject< boolean>(
    Boolean(localStorage.getItem(
      this.TOKEN_KEY 
    ))
  );
  constructor(private http: HttpClient) { }
  // ver de donde sacar el usuario y agregarlo a any
  getToken():string{
    return localStorage.getItem(this.TOKEN_KEY)??'' //si no encuentra el token me devuelve comillas vacias
  }
  
  login(_credentials: LogRequest): Observable<string>{
   
    return this.http.get<string>(this.apiUrl).pipe(
      map (()=>"tokenPrueba"), //cuandoa el back funcione borrar esta linea
     //y en la linea 30 donde dice token (seguro me va a devolver un objeto) dejarlo como esta si el back me devuleve el token limpio
     // pero si me devuelve un json, buscar dentro de ese json el token
     //
      tap((token:string)=>{ //si tira 200, pasa por aca y va a obtener la data
        localStorage.setItem(this.TOKEN_KEY, token) //setea el localstorage
       this.isUserLogin$.next(true)//esto se ejecuta siempre y cuando me haya loguado bien
      })
      ///catchError(this.handleError)
    )

  }
  isUserLogin(  //metodo 
  ): Observable <boolean>{
    return this.isUserLogin$.asObservable(

    )
  }

  logout():void{ //
    localStorage.removeItem(this.TOKEN_KEY)
    this.isUserLogin$.next(false)
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
