import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        nombre: ['', [Validators.required], []],
        apellido: ['', [Validators.required], []],
        email: ['', [Validators.required, Validators.email], []],
        direccion: ['', [Validators.required], []],
        barrio: ['', [Validators.required], []],
        localidad: ['', [Validators.required], []],
        cp: ['', [Validators.required], []],
        telefono: ['', [Validators.required], []],
        password: ['', [Validators.required], []],
        password2: ['', [Validators.required], []],
      }
    )
  }

  onEnviar(event: Event) {
    console.log(this.form.value)
  }

}
