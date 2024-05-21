import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CarritoComponent } from './carrito/carrito.component';



import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'registro', component: RegistroComponent },

];