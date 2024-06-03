import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../data/products.data'
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  form: FormGroup;
  producto: Product = new Product();
  data: any[] = [];


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



  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(): void {
    this.productoService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    })
  }

  borrarData(id: string): void {
    this.productoService.deleteData(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
        window.location.reload();
        
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  

  onEnviar(event: Event): void {
    
    if (this.form.valid) {
      console.log("Enviando al servidor...");
      this.productoService.createProduct(this.form.value as Product).subscribe(
        data => {
          console.log(data.id);
          console.log(this.form.value as Product)
          window.location.reload();
          if (data.id > 0) {
            console.log("Se ha creado exitosamente");

          }
        })
    }
    else {
      console.log("error");
    }
  }



}




