import { Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AuthComponent } from './pages/auth/auth.component';


export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full" },
    {path: 'productos', component: ProductosComponent},
    {path: 'home', component: HomeComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'auth', component: AuthComponent}
];