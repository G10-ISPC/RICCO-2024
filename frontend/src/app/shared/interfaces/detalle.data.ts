export interface Detalle {
    "precio_calculado": number;
    "cantidad": number;

    "producto": {
    "nombre_producto": string;
    }
    "compra":{
        "fecha": number;
    }
        
    }
    

export class Detalle {
    "nombre_producto": string;
    "cantidad": number;
    "fecha": number;       
    "precio_calculado": number;
       
  
constructor(nombre_producto: string, cantidad: number = 0,  fecha: number = 0, precio_calculado: number = 0, ) {
    this.nombre_producto = nombre_producto; 
    this.cantidad = cantidad;
    this.fecha = fecha; 
    this.precio_calculado = precio_calculado;        
    }
  } 