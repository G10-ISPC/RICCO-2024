import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const letrasPattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*$/;
const addressPattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s,'-]*$/;
const phonePattern = /^\d{10,15}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{8,}$/;
const postcodePattern = /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/


import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from '../data/usuario';
import { RegistroService } from '../services/registro.service';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  };
}


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {


  constructor(private formBuilder: FormBuilder, private router: Router, private registroService: RegistroService) { }


  formRegister: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(letrasPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(passwordPattern)]),
    password2: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(letrasPattern)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(letrasPattern)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(phonePattern)]),
    direccion: this.formBuilder.group({
      calle: new FormControl('', [Validators.required, Validators.pattern(addressPattern)]),
      numero: new FormControl('', [Validators.required, Validators.pattern(addressPattern)]),
      barrio: this.formBuilder.group({
        nombre_barrio: new FormControl('', [Validators.required, Validators.pattern(addressPattern)]),
        localidad: this.formBuilder.group({
          nombre_localidad: new FormControl('', [Validators.required, Validators.pattern(addressPattern)]),
          cod_postal: new FormControl('', [Validators.required, Validators.pattern(postcodePattern)]),
        })
      })
    })
  }, { validators: passwordMatchValidator('password', 'password2') }
  );


  get username() { return this.formRegister.get('username') as FormControl; }
  get password() { return this.formRegister.get('password') as FormControl; }
  get password2() { return this.formRegister.get('password2') as FormControl; }
  get email() { return this.formRegister.get('email') as FormControl; }
  get first_name() { return this.formRegister.get('first_name') as FormControl; }
  get last_name() { return this.formRegister.get('last_name') as FormControl; }
  get telefono() { return this.formRegister.get('telefono') as FormControl; }
  get direccion() { return this.formRegister.get('direccion') as FormControl; }
  get calle() { return this.direccion.get('calle') as FormControl; }
  get numero() { return this.direccion.get('numero') as FormControl; }
  get barrio() { return this.direccion.get('barrio') as FormControl; }
  get nombre_barrio() { return this.barrio.get('nombre_barrio') as FormControl; }
  get localidad() { return this.barrio.get('localidad') as FormControl; }
  get nombre_localidad() { return this.localidad.get('nombre_localidad') as FormControl; }
  get cod_postal() { return this.localidad.get('cod_postal') as FormControl; }

  registrarUsuario() {
    if (this.formRegister.invalid) return;

    const objeto: usuario = {
      username: this.formRegister.value.username,
      password: this.formRegister.value.password,
      password2: this.formRegister.value.password2,
      email: this.formRegister.value.email,
      first_name: this.formRegister.value.first_name,
      last_name: this.formRegister.value.last_name,
      telefono: this.formRegister.value.telefono,
      direccion: {
        calle: this.formRegister.value.direccion.calle,
        numero: this.formRegister.value.direccion.numero,
        barrio: {
          nombre_barrio: this.formRegister.value.direccion.barrio.nombre_barrio,
          localidad: {
            nombre_localidad: this.formRegister.value.direccion.barrio.localidad.nombre_localidad,
            cod_postal: this.formRegister.value.direccion.barrio.localidad.cod_postal
          }
        }
      },
    };

    // Llamar al servicio para registrar el usuario
    this.registroService.registrarUsuario(objeto).subscribe({
      next: (data: any) => {
        if (data.token) {
          this.router.navigate(['']); // Redirigir a la página principal si se registró correctamente
        } else {
          alert("No se pudo registrar"); // Mostrar mensaje de error si no se pudo registrar
        }
      },
      error: (error: any) => {
        console.error('Error al registrar usuario:', error.message);

      }
    });
  }


}