import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../services/log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
constructor (private logService: LogService, 
  private route: Router
){}
readonly isUserLogin$=this.logService.isUserLogin();
logout():void{
  this.logService.logout();
  this.route.navigateByUrl("/login")
}
}
