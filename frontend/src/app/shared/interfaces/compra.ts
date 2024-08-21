export interface Compra {
  descripcion: string;
  precio_total: number;
  user_id?: number;
  detalles: DetalleCompra[];
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  fecha: Date; 
}

export interface DetalleCompra {
  cantidad: number;
  precio_calculado: number;
  producto_id: string;
  nombre_producto: string;
}

