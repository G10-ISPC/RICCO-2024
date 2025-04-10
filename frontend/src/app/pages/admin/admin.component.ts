import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../shared/interfaces/products.data';
import { ProductoService } from '../../core/services/producto.service';
import { Detalle, Compra } from '../../shared/interfaces/compra';
import { DetalleService } from '../../core/services/detalle.service';
import { CompraGralService } from '../../core/services/compra-gral.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';





@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule], 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // Variables principales
  form: FormGroup;
  producto: Product = new Product();
  productoEnEdicion: number | null = null; // ID del producto en edición
  view: string = ''; // Controla las vistas (productos o compras)
  public products = signal<Product[]>([] as Product[]); // Almacena los productos
  data: any[] = []; // Para datos adicionales
  showForm: boolean = false;
  editMode: boolean = false;

  
  // Datos para detalles y compras
  getDetalle: Detalle[] = [];
  getCompra: Compra[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private detalleService: DetalleService,
    private compraGralService: CompraGralService
  ) {
    // Configuración del formulario reactivo
    this.form = this.formBuilder.group({
      nombre_producto: ['', [Validators.required]],
      imagenUrl: [''],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Carga inicial de datos
    this.llenarData();
    this.obtenerDetalles();
    this.obtenerTodasLasCompras();
  }

  // Cargar detalles
  obtenerDetalles(): void {
    this.detalleService.getDetalle().subscribe(
      (data: Detalle[]) => {
        this.getDetalle = data;
        console.log('Detalles obtenidos:', data);
      },
      (error) => {
        console.error('Error al obtener los detalles:', error);
      }
    );
  }

  // Cargar compras
  obtenerTodasLasCompras(): void {
    this.compraGralService.getCompras().subscribe(
      (data: Compra[]) => {
        this.getCompra = data.map(compra => ({
          ...compra,
          user_first_name: compra.user_first_name || '',
          user_last_name: compra.user_last_name || ''
        }));
        console.log('Compras recibidas del backend:', this.getCompra);
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }

  // Cargar productos
  llenarData(): void {
  console.log('✅ Ejecutando llenarData()...');
  this.productoService.getData().subscribe(
    (data: Product[]) => {
      this.products.set(
        data.map(producto => ({
          ...producto,
          imgUrl: `../assets/img/${producto.nombre_producto.toLowerCase().replace(/\s/g, '')}.jpg`
        }))
      );
      console.log('📦 Productos cargados en el administrador:', this.products());
    },
    error => {
      console.error('❌ Error al obtener los productos:', error);
    }
  );
}

  // Eliminar producto
  borrarData(event: any, id: string): void {
    event.preventDefault();
    this.productoService.deleteData(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
        this.products.update(products => products.filter(product => product.id_producto !== id));
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  // Crear o actualizar producto
  onEnviar(event: Event): void {
    event.preventDefault(); // Evitar comportamiento predeterminado
    console.log('Botón añadir presionado, ejecutando onEnviar...');

    if (this.form.valid) {
      const producto = this.form.value as Product;
      console.log('Datos del formulario antes de enviar:', producto);

      if (this.productoEnEdicion) {
        // Actualizar producto
        console.log(`Actualizando producto con ID ${this.productoEnEdicion}...`);
        this.productoService.updateProduct(this.productoEnEdicion, producto).subscribe(
          response => {
            console.log('Producto actualizado:', response);
            this.llenarData();
            this.resetFormulario();
          },
          error => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        // Crear nuevo producto
        console.log('Creando nuevo producto...');
        this.productoService.createProduct(producto).subscribe(
          response => {
            console.log('Producto creado exitosamente:', response);
            this.llenarData();
             // Ocultar el formulario después de enviar
            this.showForm = false;

            this.resetFormulario();
          },
          error => {
            console.error('Error al crear el producto:', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  // Configurar vista "productos"
  showProducts(): void {
    this.view = 'productos';
    this.showForm = false;
  }

  // Configurar vista "compras"
  showPurchases(): void {
    this.view = 'compras';
    this.showForm = false;
  }

  // Editar producto
  editProduct(producto: Product): void {
    this.form.patchValue({
      nombre_producto: producto.nombre_producto,
      descripcion: producto.descripcion,
      precio: producto.precio
      
    });
    this.productoEnEdicion = Number(producto.id_producto); // Conversión de string a number
    console.log('Producto en edición:', this.productoEnEdicion);
    // Mostrar el formulario para editar
     this.showForm = true;
     this.editMode = true; // Activamos el modo edición


  }

  // Reiniciar formulario
  resetFormulario(): void {
    this.form.reset();
    this.productoEnEdicion = null; // Salir del modo edición
  }

  toggleVisibility(producto: Product): void {
    producto.visible = !producto.visible; // Alternar la visibilidad
  
    console.log("Producto actualizado:", producto);
  
    const idProductoNumerico = Number(producto.id_producto);
  
    if (!isNaN(idProductoNumerico)) {
      this.productoService.updateProduct(idProductoNumerico, producto).subscribe(() => {
        console.log(`✅ Visibilidad actualizada en el backend para el producto ${producto.id_producto}`);
  
        // 🔄 Recargar la tabla del administrador con TODOS los productos
        this.llenarData();
      }, error => {
        console.error('❌ Error al actualizar la visibilidad:', error);
      });
    } else {
      console.error(`❌ Error: id_producto (${producto.id_producto}) no es un número válido.`);
    }
  }
  showProductForm() {
    this.showForm = true;
    this.editMode = false; // Desactivamos el modo edición

  }
  
  hideProductForm() {
    this.showForm = false;
  }

  closeForm(): void {
    this.showForm = false;
  }
  filtroUsuario: string = '';
filtroFecha: string = '';
filtroProducto: string = '';
comprasFiltradas: Compra[] = [];

filtrarCompras() {
  this.comprasFiltradas = this.getCompra.filter(compra => {
    return (
      (!this.filtroUsuario || (compra.user_first_name?.toLowerCase().includes(this.filtroUsuario.toLowerCase()) || compra.user_last_name?.toLowerCase().includes(this.filtroUsuario.toLowerCase()))) &&
      (!this.filtroFecha || new Date(compra.fecha).toISOString().split('T')[0] === this.filtroFecha) &&
      (!this.filtroProducto || compra.detalles.some(detalle => detalle.nombre_producto?.toLowerCase().includes(this.filtroProducto.toLowerCase())))
    );
  });
}

cumpleFiltro(compra: Compra, detalle: Detalle): boolean { 
  return (
    (!this.filtroUsuario || (
      (compra.user_first_name ?? '').toLowerCase().includes(this.filtroUsuario.toLowerCase()) || 
      (compra.user_last_name ?? '').toLowerCase().includes(this.filtroUsuario.toLowerCase())
    )) &&
    (!this.filtroFecha || new Date(compra.fecha ?? '').toISOString().split('T')[0] === this.filtroFecha) &&
    (!this.filtroProducto || (
      (detalle.nombre_producto ?? '').toLowerCase().includes((this.filtroProducto ?? '').toLowerCase())
    ))
  );
}
exportarExcel(): void {
  this.filtrarCompras(); // Aplicar filtros antes de la exportación

  const datosAExportar = this.comprasFiltradas.length > 0 ? this.comprasFiltradas : this.getCompra;

  const datos = datosAExportar.map(compra => ({
    Usuario: `${compra.user_first_name ?? ''} ${compra.user_last_name ?? ''}`,
    Producto: compra.detalles.map(detalle => detalle.nombre_producto).join(', '),
    Cantidad: compra.detalles.map(detalle => detalle.cantidad).join(', '),
    Fecha: new Date(compra.fecha).toISOString().split('T')[0],
    Precio: compra.detalles.map(detalle => detalle.precio_calculado).join(', ')
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Compras');

  XLSX.writeFile(libro, 'compras_filtradas.xlsx');
}
}
