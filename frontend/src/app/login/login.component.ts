import { CommonModule } from '@angular/common';
import { Component,  OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../services/log.service';
import { LogRequest } from '../data/logRequest';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: string = "";
  loginForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder, private router:Router, private logService: LogService){

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email],[]],
      password: ['', [Validators.required],[]],
    });
  }

 
  get email()
  {
    return this.loginForm.get('email');
  }

  get password()
  {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: LogRequest = this.loginForm.value;
      this.logService.login(credentials).subscribe({
          next: (userData) =>{
          console.log("usuario autenticado.",userData);
          this.router.navigateByUrl('/home');
          this.loginForm.reset(); 
        },
        error: (error) =>{
          console.error("Error en el inicio de sesión.",error);
          this.loginError=error.message || "Error en el inicio de sesión.";
        },
        complete: () => {
          console.info("Login completo");
 
        }
        
      })

      }

    
    else{
      this.loginForm.markAllAsTouched();
      alert("Por favor, complete todos los campos.");
    }
  }


}

