import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../services/log.service';
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
constructor (private logService: LogService, 
  private route: Router
){
  this.isAdmin$.subscribe( __values=> { //
    console.log (__values) //
  }
  )
}
readonly isUserLogin$=this.logService.isUserLogin();
logout():void{
  this.logService.logout();
  this.route.navigateByUrl("/login")
}
}
