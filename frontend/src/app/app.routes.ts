import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { Error404Component } from './error404/error404.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialdecomprasComponent } from './dashboard/historialdecompras/historialdecompras.component';
import { ComprasrecientesComponent } from './dashboard/comprasrecientes/comprasrecientes.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'registro', component: RegistroComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'historialdecompras', component: HistorialdecomprasComponent },
    { path: 'comprasrecientes', component: ComprasrecientesComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', component: Error404Component },
];