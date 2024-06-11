import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signIn = inject(LoginService);
  router = inject(Router);

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {

        email: ['', [Validators.required, Validators.email], []],

        password: ['', [Validators.required], []],

      }
    )
  }

  get Email() {

    return this.loginForm.get("email");

  }

  get Password() {

    return this.loginForm.get("password");

  }

  login() {
    if (this.loginForm.valid) {

      this.signIn.login(this.loginForm.value);
      this.router.navigate(['/']);
      this.loginForm.reset();

    } else {

      this.loginForm.markAllAsTouched();

      alert("Error al ingresar los datos")
    }
  }


}
