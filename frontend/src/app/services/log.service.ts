import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LogRequest } from '../data/logRequest';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiUrl = 'api/login/';
  private readonly TOKEN_KEY = "token";
  private readonly isUserLogin$ = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem(this.TOKEN_KEY))
  );

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  login(_credentials: LogRequest): Observable<void> {
    return this.http.post<any>(this.apiUrl, _credentials).pipe(
      tap((response: any) => {
        const token = response.token; 
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          this.isUserLogin$.next(true);
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
      console.error("backend retoro el código de estado", error.status, error.error);
    }
    return throwError(() => new Error("Algo falló, por favor intente nuevamente"));
  }
}