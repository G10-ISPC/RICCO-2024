import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LogService } from "../services/log.service";

export const injectToken: HttpInterceptorFn=(req,next)=>{
    const loginService=inject(LogService)
    const modifiedRequest=req.clone({setHeaders:{Autentification:loginService.getToken()}})
    console.log (req)
    return next(modifiedRequest)
}
//injectToken devuelve req 
//modifiedRequest lo cree.
//Autentification lo cree
//getToken es un metodo que cree 