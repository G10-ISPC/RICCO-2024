import { Injectable } from '@angular/core';
import { Developer } from '../interfaces/developer.interface';


@Injectable({
  providedIn: 'root',
})

export class NosotrosService {
  developerList: Developer[] = [];

  constructor() { }  

obtenerDeveloper()
  {
    this.developerList = [
      {
        id: 1,
        name: 'Mariana Cos',
        fotoUrl: '../assets/img/mariana.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
          },
        
      },

      {
        id: 2,
        name: 'Carla Arévalo',
        fotoUrl: '../assets/img/carla.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

      {
        id: 3,
        name: 'Félix Figueroa',
        fotoUrl: '../assets/img/antonioR2.jpg',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com/felixantonio.figueroa.7',
          instagram: 'https://www.instagram.com/a_figueroa34/',
          linkedin: 'https://www.linkedin.com/in/felix-antonio-figueroa-970198123',
          github: 'https://github.com/fafigueroa',
        },
        
      },

      {
        id: 4,
        name: 'Micaela Juarez',
        fotoUrl: '../assets/img/micaela.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

      {
        id: 5,
        name: 'Delfina Aricoma',
        fotoUrl: '../assets/img/delfina.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

      {
        id: 6,
        name: 'Melisa Gulle',
        fotoUrl: '../assets/img/Melisa.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

      {
        id: 7,
        name: 'Dalma Ponce',
        fotoUrl: '../assets/img/Dalma.jpg',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

      {
        id: 8,
        name: 'Laura Cruz',
        fotoUrl: '../assets/img/laura.png',
        rol: 'Developer Team',
        redesSociales: {
          facebook: 'https://www.facebook.com',
          instagram: 'https://www.instagram.com',
          linkedin: 'https://www.linkedin.com',
          github: 'https://github.com',
        },
        
      },

    ];
    return this.developerList;
  }
}

