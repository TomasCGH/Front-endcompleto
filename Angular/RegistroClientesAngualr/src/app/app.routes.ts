import { Routes } from '@angular/router';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarClienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }

];
