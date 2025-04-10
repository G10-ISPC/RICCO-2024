// login.component.ts

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogService } from '../../core/services/log.service';
import { LogRequest } from '../../shared/interfaces/logRequest';
import { LogResponse } from '../../shared/interfaces/logResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: string = "";
  loginForm!: FormGroup;
  showWelcomeMessage: boolean = false;
  welcomeMessage: string = "";
  passwordFieldType: string = 'password';

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: LogRequest = this.loginForm.value;
      this.logService.login(credentials).subscribe({
        next: (userData: LogResponse) => {
          const userInfo = this.logService.getUserIdFromToken();
          const firstName = userInfo.first_name;
          const lastName = userInfo.last_name;
          this.welcomeMessage = `Login exitoso.. Bienvenido ${firstName} ${lastName}`;
          this.showWelcomeMessage = true;
          setTimeout(() => {
            this.showWelcomeMessage = false;
            this.router.navigateByUrl('/home'); // Redirige al panel correspondiente
          }, 3000); // Espera 3 segundos antes de redirigir
          this.loginForm.reset();
        },
        error: (error) => {
          console.error("Error en el inicio de sesión:", error);
          this.loginError = error.message || "Error en el inicio de sesión.";
          alert(this.loginError);
          this.loginForm.reset();
        },
        complete: () => {
          console.info("Login completo");
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Por favor, complete todos los campos.");
    }
  }
}
