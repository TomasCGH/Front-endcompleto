import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credenciales = {
    username: '',
    contrasena: ''
  };

  mensaje = '';
  cargando = false;

  constructor(private router: Router) {}

  iniciarSesion(form: NgForm) {
    if (!form.valid) return;

    this.cargando = true;

    // Simulación de petición al backend
    setTimeout(() => {
      this.cargando = false;

      if (
        this.credenciales.username === 'admin' &&
        this.credenciales.contrasena === '123456'
      ) {
        this.mensaje = '✅ Inicio de sesión exitoso.';
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      } else {
        this.mensaje = '❌ Credenciales incorrectas.';
      }
    }, 1500);
  }
  
  irARegistro() {
    this.router.navigate(['/registrar']);
  }

}

