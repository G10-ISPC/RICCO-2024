import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../services/log.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isAdmin$!: Observable<boolean>; 
constructor (private logService: LogService, 
  private route: Router
){
  this.logService.isAdmin.subscribe(isAdmin => { 
    this.isAdmin$ = this.logService.isAdmin;
  });
}
readonly isUserLogin$=this.logService.isUserLogin();
logout():void{
  this.logService.logout();
  this.route.navigateByUrl("/login")
}
}
