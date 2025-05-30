import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ClienteDTO } from '../servicios/cliente.service';
import { ClienteService } from '../servicios/cliente.service';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,FontAwesomeModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  cliente = {
    nombre: '',
    username: '',
    contrasena: '',
    confirmarContrasena: '',
    prefijoTelefono: '',
    telefono: ''
  };

  confirmarContrasena: string = '';

  mensaje = '';
  cargando = false;
  
  showPassword = false;
  showConfirmPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

  
  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

   contrasenasCoinciden(): boolean {
  return this.cliente.contrasena === this.cliente.confirmarContrasena;
  }


  registrarCliente(formulario: NgForm) {
  if (!formulario.valid || !this.contrasenasCoinciden()) {
    this.mensaje = '❌ Las contraseñas no coinciden.';
    return;
  }

    this.cargando = true;

    const clienteDTO: ClienteDTO = {
      nombre: this.cliente.nombre,
      username: this.cliente.username,
      contrasena: this.cliente.contrasena,
      prefijoTelefono: this.cliente.prefijoTelefono,
      telefono: this.cliente.telefono
    };

    this.clienteService.registrarCliente(clienteDTO).subscribe({
      next: () => {
        this.mensaje = '✅ Cliente registrado correctamente.';
        formulario.resetForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
        this.cargando = false;
      },
      error: (error) => {
     console.error('❌ Error al registrar cliente:', error);
    this.mensaje = '❌ ' + (error.error || 'Error desconocido');
    this.cargando = false;
    }

    });
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }

  irAOrganizacion() {
  this.router.navigate(['/organizacion']); // o la ruta que definas
}

}
