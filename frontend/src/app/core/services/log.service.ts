import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LogRequest } from '../../shared/interfaces/logRequest';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiUrl = 'api/login/';
  private readonly TOKEN_KEY = "token";
  private readonly isUserLogin$ = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem(this.TOKEN_KEY))
  );
  private readonly isAdmin$ = new BehaviorSubject<boolean>(false); 

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  // Método para obtener el estado de isAdmin
  get isAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  login(_credentials: LogRequest): Observable<void> {
    return this.http.post<any>(this.apiUrl, _credentials).pipe(
      tap((response: any) => {
        const token = response.token; 
        const isAdmin = response.is_staff; // Obtener el estado de is_staff de la respuesta
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          this.isUserLogin$.next(true);
          this.isAdmin$.next(isAdmin); // Emitir el valor de isAdmin
        } else {
          throw new Error("Este usuario no existe.");
        }
      }),
      catchError(this.handleError) 
        
    );
  }

  isUserLogin(): Observable<boolean> {
    return this.isUserLogin$.asObservable();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isUserLogin$.next(false);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error("Se ha producido un error", error.error);
    } else {
      console.error("backend retorno el código de estado", error.status, error.error);
    }
    return throwError(() => new Error("Email o Contraseña no son válidos"));
  }
}