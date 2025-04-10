  

export class Product {
  id?: string; 
  id_producto: string;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  imgUrl: string;
  visible?: boolean;

  constructor(
    id_producto: string = '',
    nombre_producto: string = '',
    descripcion: string = '',
    precio: number = 0,
    imgUrl: string = '',
    visible: boolean = true
  ) {
    this.id_producto = id_producto;
    this.nombre_producto = nombre_producto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imgUrl = imgUrl;
    this.visible = visible;

  }
}
