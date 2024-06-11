import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const letrasPattern = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*$/;
const addressPattern=/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s,'-]*$/;
const phonePattern=/^\d{10,15}$/;
const passwordPattern= /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9]{8,}$/;
const postcodePattern=/^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/


import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

  get name(){
    return this.formRegister.get('name') as FormControl;
  }
  get surname(){
    return this.formRegister.get('surname') as FormControl;
  }
  get email(){
    return this.formRegister.get('email') as FormControl;
  }
  get address(){
    return this.formRegister.get('address') as FormControl;
  }
  get neighborhood() {
    return this.formRegister.get('neighborhood') as FormControl;
  }
  get location() {
    return this.formRegister.get('location') as FormControl;
  }
  get postcode() {
    return this.formRegister.get('postcode') as FormControl;
  }
  get phone() {
    return this.formRegister.get('phone') as FormControl;
  }
  get password() {
    return this.formRegister.get('password') as FormControl;
  }
  get password2() {
    return this.formRegister.get('password2') as FormControl;
  }

  formRegister= new FormGroup({
    'name' : new FormControl('', [Validators.required,  Validators.minLength(3),Validators.pattern(letrasPattern)]),
    'surname' : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(letrasPattern)]),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'address': new FormControl('', [Validators.required,Validators.pattern(addressPattern)]),
    'neighborhood': new FormControl('', [Validators.required,Validators.pattern(addressPattern)]),
    'location': new FormControl('', [Validators.required,Validators.pattern(addressPattern)]),
    'postcode': new FormControl('', [Validators.required, Validators.pattern(postcodePattern)] ),
    'phone': new FormControl('', [Validators.required,Validators.pattern(phonePattern)]),
    'password': new FormControl('',[Validators.required, Validators.pattern(passwordPattern)]),
    'password2': new FormControl('', Validators.required), 

      },{ validators: passwordMatchValidator('password', 'password2') }
    ); 
  }


