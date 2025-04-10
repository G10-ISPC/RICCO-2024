import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LogService } from "../../core/services/log.service";

export const injectToken: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LogService);
    const token = loginService.getToken();
    console.log(`Token: ${token}`);  // Log para verificar el token recuperado
    if (token) {
        const modifiedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(modifiedRequest);  // Log para verificar la solicitud modificada
        return next(modifiedRequest);
    } else {
        return next(req);  // Continúa sin modificar la solicitud si no hay token
    }
};

//injectToken devuelve req 
//modifiedRequest lo cree.
//Autentification lo cree
//getToken es un metodo que cree 