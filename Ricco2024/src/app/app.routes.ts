import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
<<<<<<< HEAD
import { LoginComponent } from './pages/auth/auth_login/login/login.component';
=======
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
>>>>>>> f6e3ddcdd7bbbe0b4f991bef4baa2ca7898bb42b


import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/auth_login/login/login.component';


export const routes: Routes = [
<<<<<<< HEAD
    {path: 'productos', component: ProductosComponent},
    {path: 'home', component: HomeComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'login', component: LoginComponent},
];
=======
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'auth', component: AuthComponent }
];
>>>>>>> f6e3ddcdd7bbbe0b4f991bef4baa2ca7898bb42b
