export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;


}

export const PRODUCTS: Product[] = [
    {
    id: 'product1',
    name: 'KING KONG BURGER',
    description: 'Para compartir!!! 6/8 porciones. Impresionante Burger XXL de 1kg, de carne, con queso cheddar fundido, lechuga, tomate y panceta crocante',
    price: 4500,
    imageUrl: '../assets/img/bur1.jpg',
    },
    {
    id: 'product2',
    name: 'TASTY RICCA',
    description: 'Pan casero. Burger de carne 220gr. Queso cheddar fundido, lechuga, tomate huevo planchado, panceta crocante y cebolla asada',
    price: 2450,
    imageUrl: '../assets/img/bur2.jpg',
    },
    {
    id: 'product3',
    name: 'AMERICAN',
    description: 'Pan casero.Burger de carne 200gr. Queso cheddar fundido con panceta crocante y huevo a la plancha',
    price: 3900,
    imageUrl: '../assets/img/bur3.jpg',
    },
    {
    id: 'product4',
    name: 'LOUIS HONOR',
    description: 'Pan casero. Doble burger de carne 200gr. Queso azul fundido.Cebolla caramelizada. Panceta crocante. Champignones asados. Rúcula',
    price: 4100,
    imageUrl: '../assets/img/bur4.jpg',
    },
    {
    id: 'product5',
    name: 'RICCA',
    description: 'Pan casero. Burger de carne 200gr. Queso muzzarella fundido. Aros de cebolla fritos. Panceta crocante. Guacamole', 
    price: 3250,
    imageUrl: '../assets/img/bur5.jpg',
    },

    {
    id: 'product6',
    name: 'LAMBHAUS',
    description: 'Pan casero. Burger de cordero 190gr. Queso brie fundido con frutos secos. Cebolla al malbec',
    price: 2780,
    imageUrl: '../assets/img/bur6.jpg',
    },

    {
    id: 'product7',
    name: 'DOUBLE CHEESE & BACON',
    description: 'Pan casero. Doble burger de carne 200gr. Doble queso cheddar. Panceta. Cebolla',
    price: 4450,
    imageUrl: '../assets/img/bur7.jpg',
    },
    {
    id: 'product8',
    name: 'LASSEN WURST',
    description: 'Pan ciabatta de aceitunas. Sandwich de chorizo alemán 140gr. Queso dambo fundido. Cebolla caramelizada. Panceta crocante',
    price: 3450,
    imageUrl: '../assets/img/bur8.jpg',
    },
];

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  
    constructor(id: string = '', name: string = '', description: string = '', price: number = 0, imageUrl: string = '') {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
    }
  }