import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../../core/services/log.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public readonly isAdmin$: Observable<boolean>=this.logService.isAdmin;//
  public username: string | null = null; // 16/01/25
  public firstName: string | null = null; // 16/01/25
  public lastName: string | null = null;// 16/01/25
constructor (private logService: LogService, 
  private route: Router
  ){
  this.isAdmin$.subscribe( __values=> { //
    console.log (__values) //
  }
  )
}
readonly isUserLogin$=this.logService.isUserLogin();
//-----16-01-25----------
ngOnInit(): void { 
  const userInfo = this.logService.getUserIdFromToken(); 
  console.log('User Info:', userInfo); // Agrega este log 
  this.firstName = userInfo.first_name; // Obtén el first_name del token 
  this.lastName = userInfo.last_name; // Obtén el last_name del token 
  console.log('First Name:', this.firstName); // Agrega este log 
  console.log('Last Name:', this.lastName); // Agrega este log
}
//-------------------
logout():void{
  this.logService.logout();
  this.route.navigateByUrl("/login")
}
}
