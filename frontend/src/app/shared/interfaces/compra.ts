// Ejemplo de definición de interfaz Compra
export interface Compra {
  descripcion: string;
  precio_total: number;
  user_id: string;
  detalles: DetalleCompra[];
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  fecha: Date; // Podría ser un string o un Date según tus necesidades
}

export interface DetalleCompra {
  cantidad: number;
  precio_calculado: number;
  producto_id: string;
}

