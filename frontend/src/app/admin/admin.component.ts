import { Component, OnInit, inject, signal } from '@angular/core';
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

public products=signal<any[]>([])

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(): void {
    this.productoService.getData().subscribe(data => {
      this.products.set(data)//
      console.log(this.data)
    })
  }

  borrarData(event: any, id: string): void {
    event.preventDefault();
    this.productoService.deleteData(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
        //window.location.reload(); hacer logica para actualizar lista
        this.products.update(products=> products.filter((product:any)=>product.id_producto!==id))
        
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  

  onEnviar(event: Event): void {
   // event.preventDefault();

    if (this.form.valid) {
      console.log("Enviando al servidor...");
      this.productoService.createProduct(this.form.value as Product).subscribe(
        response => {
          console.log("Respuesta del servidor:", response);
          if (response && response.id_producto) {
            console.log("Producto creado exitosamente. ID:", response.id_producto);
            this.form.get('nombre_producto')?.setValue('');
        this.form.get('imagenUrl')?.setValue('');
        this.form.get('descripcion')?.setValue('');
        this.form.get('precio')?.setValue('');
            this.llenarData();        
            // this.llenarData(); // Ejemplo: actualizar la lista de productos después de crear uno nuevo
          } else {
            console.error("No se recibió un ID válido del producto creado");
          }
        },
        error => {
          console.error('Error al crear el producto', error);
          // Maneja el error apropiadamente, por ejemplo, mostrando un mensaje de error al usuario
        }
      );
    } else {
      console.log("Formulario inválido");
      // Maneja el caso donde el formulario no es válido
    }
  }
}
