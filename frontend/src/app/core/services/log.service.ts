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

  getToken(): string { //17-01-25
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Token recuperado:', token); 
    return token ?? '';
    //return localStorage.getItem(this.TOKEN_KEY) ?? '';
    
  }

  getUserIdFromToken():{id:number | null, username:string | null, first_name: string | null, last_name: string | null}{
    const token = this.getToken();
    console.log('Token:', token); // Verifica que el token se está obteniendo correctamente
    if (!token) {
      console.error('Token no encontrado');
      return { id: null, username: null, first_name:null, last_name:null};
    }//17-01-25
  
    const payloadBase64 = token.split('.')[1];
    const payloadString = atob(payloadBase64);
    
    try {
      const payload = JSON.parse(payloadString);
      console.log('Payload:', payload);
      
      // Asegúrate de que el ID del usuario esté en el campo correcto
      return { id: payload.user?.id ?? null,
        username: payload.user?.username ?? null,
        first_name: payload.first_name ?? null, 
        last_name: payload.last_name ?? null
       };
    } catch (e) {
      console.error('Error al parsear el payload del token:', e);
      return { id: null, username: null,  first_name: null, last_name: null };//17-01-25
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

