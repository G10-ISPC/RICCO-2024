  export interface Product {
    id_producto: string;
    nombre_producto: string;
    descripcion: string;
    precio: number;
    imgUrl: string;    
}

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  static nombre_producto: string;
  static imgUrl: string;
  static precio: number;
  static id: string;
  
    constructor(id: string = '', name: string = '', description: string = '', price: number = 0, imageUrl: string = '') {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
    }
  }

