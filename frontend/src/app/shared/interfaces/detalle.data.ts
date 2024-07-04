export interface Detalle {
    id_detalle?: number;
    cantidad: number;
    precio_calculado: number;
    id_producto: string;
    compra?: Compra; // Relación opcional con Compra si existe
  }
  
  export interface Compra {
    descripcion: string;
    precio_total: number;
    user_id: string;
    detalles: DetalleCompra[];
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    fecha: Date; // O string dependiendo de la API
  }
  
  export interface DetalleCompra {
    cantidad: number;
    precio_calculado: number;
    producto_id: string;
  }
    

// // export class Detalle {
// //     id_detalle?: number; // El ID puede ser opcional si se genera automáticamente en el backend
// //     cantidad: number;
// //     precio_calculado: number;
// //     id_producto: string;
       
  
// // constructor(nombre_producto: string, cantidad: number = 0,  fecha: number = 0, precio_calculado: number = 0, ) {
// //     this.nombre_producto = nombre_producto; 
// //     this.cantidad = cantidad;
// //     this.fecha = fecha; 
// //     this.precio_calculado = precio_calculado;        
// //     }
// //   } 

//   export interface DetalleCompra {
//     id_detalle?: number; // El ID puede ser opcional si se genera automáticamente en el backend
//     cantidad: number;
//     precio_calculado: number;
//     id_producto: string; // Suponiendo que el ID del producto es una cadena
//   }