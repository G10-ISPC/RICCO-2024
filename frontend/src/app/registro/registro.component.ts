import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const namePattern = /^[a-zA-Z]*$/;
const phonePattern = /^[0-9]*$/;


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
  get phone(){
    return this.formRegister.get('phone') as FormControl;
  }
  


  formRegister= new FormGroup({
    'name' : new FormControl('', [Validators.required, Validators.pattern(namePattern)]),
    'surname' : new FormControl('', [Validators.required, Validators.pattern(namePattern)]),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'adress': new FormControl('', Validators.required),
    'barrio': new FormControl('', Validators.required),
    'localidad': new FormControl('', Validators.required),
    'postcode': new FormControl('', Validators.required),
    'phone': new FormControl('', [Validators.required, Validators.pattern(phonePattern)]),
    'password': new FormControl('',Validators.required),
    'password2': new FormControl('', Validators.required), 

      }
    );
  }


