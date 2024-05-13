import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = "";
  password = "";

  onEnviar(): void {/*
      if (this.email === "admin@gmail.com" && this.password === "admin123") {
  
        alert("¡Bienvenido!");
      } else if (this.email != "admin@gmail.com") {
        alert("Email incorrecto");
  
      } else if (this.password != "admin123")*/

  }

}
