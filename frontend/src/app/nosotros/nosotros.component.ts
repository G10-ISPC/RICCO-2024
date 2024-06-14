import { Component } from '@angular/core';
import { NosotrosService } from '../services/nosotros.service';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})

export class NosotrosComponent {
  developerList: any;
  constructor(private NosotrosService:NosotrosService)
  {
    this.developerList = NosotrosService.obtenerDeveloper();
  }

}



