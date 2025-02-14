import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {
    this.checkAdminStatus();
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Token recuperado:', token); 
    return token ?? '';
  }

  decodeToken(token: string): any {
    const payloadBase64 = token.split('.')[1];
    const payloadString = atob(payloadBase64);
    return JSON.parse(payloadString);
  }

  getUserIdFromToken(): { id: number | null, username: string | null, first_name: string | null, last_name: string | null } {
    const token = this.getToken();
    console.log('Token:', token); // Verifica que el token se está obteniendo correctamente
    if (!token) {
      console.error('Token no encontrado');
      return { id: null, username: null, first_name: null, last_name: null };
    }

    try {
      const payload = this.decodeToken(token);
      console.log('Payload:', JSON.stringify(payload, null, 2));
      
      return {
        id: payload.user_id ?? null,
        username: payload.username ?? null,
        first_name: payload.first_name ?? null, 
        last_name: payload.last_name ?? null
      };
    } catch (e) {
      console.error('Error al parsear el payload del token:', e);
      return { id: null, username: null, first_name: null, last_name: null };
    }
  }

  checkAdminStatus() {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Log adicional para verificar la decodificación
      this.isAdmin$.next(decodedToken.is_staff);
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
          console.log('Token guardado:', localStorage.getItem(this.TOKEN_KEY));
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
    this.isAdmin$.next(false);
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
