import { Component } from '@angular/core';
import { Product } from '../data/products.data'
import { ProductoService } from '../services/producto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  form: FormGroup;
  producto: Product = new Product();

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, private router: Router) {
    this.form = this.formBuilder.group(
      {
        nombre_producto: ['', [Validators.required]],
        imagenUrl: [''],
        descripcion: ['', [Validators.required]],
        precio: ['', [Validators.required]],
        
      }
    )
  }
  onEnviar(event: Event): void {
    event.preventDefault;
    if (this.form.valid) {
      console.log("Enviando al servidor...");
      this.productoService.createProduct(this.form.value as Product).subscribe(
        data => {
          console.log(data.id);

          console.log(this.form.value as Product)
          if (data.id > 0) {
            alert("El producto ha sido creado satisfactoriamente");
  
              this.router.navigate(['/administracion'])
              }
        })
    }
    else {
      console.log("error");
    }
  }
}

