import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LogRequest } from '../../shared/interfaces/logRequest';
import { LogResponse } from '../../shared/interfaces/logResponse';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'api/login/';
  private readonly TOKEN_KEY = "token";
  private readonly isUserLogin$ = new BehaviorSubject<boolean>(
    Boolean(localStorage.getItem(this.TOKEN_KEY))
  );
  private readonly isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      console.error('Token no encontrado');
      return null;
    }
  
    const payloadBase64 = token.split('.')[1];
    const payloadString = atob(payloadBase64);
    
    try {
      const payload = JSON.parse(payloadString);
      console.log('Payload:', payload);
      
      // Asegúrate de que el ID del usuario esté en el campo correcto
      return payload.user?.id ?? null; // Ajusta según la estructura del payload
    } catch (e) {
      console.error('Error al parsear el payload del token:', e);
      return null;
    }
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  login(credentials: LogRequest): Observable<LogResponse> {
    return this.http.post<LogResponse>(this.apiUrl, credentials).pipe(
      tap((response: LogResponse) => {
        const token = response.token;
        const isAdmin = response.is_staff;
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          this.isUserLogin$.next(true);
          this.isAdmin$.next(isAdmin);
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
      console.error("Backend retornó el código de estado", error.status, error.error);
    }
    return throwError(() => new Error("Email o Contraseña no son válidos"));
  }
}

