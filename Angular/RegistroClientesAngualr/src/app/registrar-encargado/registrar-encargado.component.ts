// src/app/registrar-encargado/registrar-encargado.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { EncargadoService, EncargadoDTO } from '../servicios/encargado.service';

@Component({
  selector: 'app-registrar-encargado',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FontAwesomeModule],
  templateUrl: './registrar-encargado.component.html',
  styleUrls: ['./registrar-encargado.component.css']
})
export class RegistrarEncargadoComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  encargado = {
    nombre: '',
    username: '',
    contrasena: '',
    confirmarContrasena: '',
    prefijoTelefono: '',
    telefono: '',
    tipoDocumento: '',
    numeroDocumento: ''
  };

  organizacionNombre: string = '';
  mensaje = '';
  mensajeTipo: 'exito' | 'error' | '' = '';
  cargando = false;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private encargadoService: EncargadoService
  ) {}

  ngOnInit(): void {
    const orgStr = localStorage.getItem('orgSeleccionada');
    if (orgStr) {
      const orgObj = JSON.parse(orgStr);
      this.organizacionNombre = orgObj.nombre?.trim() || '';
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  contrasenasCoinciden(): boolean {
    return this.encargado.contrasena === this.encargado.confirmarContrasena;
  }

  irAOrganizacion(): void {
    this.router.navigate(['/login']);
  }

  registrarEncargado(formulario: NgForm): void {
    this.mensaje = '';
    this.mensajeTipo = '';

    if (!this.contrasenasCoinciden()) {
      this.mensaje = '❌ Las contraseñas no coinciden.';
      this.mensajeTipo = 'error';
      return;
    }

    this.cargando = true;

    const encargadoDTO: EncargadoDTO = {
      nombre: this.encargado.nombre.trim(),
      username: this.encargado.username.trim(),
      contrasena: this.encargado.contrasena, // no usar .trim()
      prefijoTelefono: this.encargado.prefijoTelefono.trim(),
      telefono: this.encargado.telefono.trim(),
      tipoDocumento: this.encargado.tipoDocumento.trim().toUpperCase(),
      numeroDocumento: this.encargado.numeroDocumento.trim(),
      organizacion: this.organizacionNombre
    };

    this.encargadoService.registrarEncargado(encargadoDTO).subscribe({
      next: (respuesta: string) => {
        this.mensaje = '✅ ' + respuesta;
        this.mensajeTipo = 'exito';
        formulario.resetForm();
        this.cargando = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (error: any) => {
        this.cargando = false;
        if (typeof error?.error === 'string') {
          this.mensaje = '❌ ' + error.error;
        } else if (error?.error?.mensaje) {
          this.mensaje = '❌ ' + error.error.mensaje;
        } else {
          this.mensaje = '❌ Error desconocido. Intenta nuevamente.';
        }
        this.mensajeTipo = 'error';
        console.error('❌ Error desde backend:', error);
      }
    });
  }

  // ——— VALIDACIONES “keypress” y “paste” ———

  /**
   * Permitir sólo letras (incluyendo Ñ/ñ, vocales acentuadas) y espacios.
   */
  soloLetrasKeypress(event: KeyboardEvent) {
    const char = event.key;
    // A–Z, a–z, ÁÉÍÓÚ, áéíóú, Ññ, espacio
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  soloLetrasPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text') || '';
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!regex.test(text)) {
      event.preventDefault();
    }
  }

  /**
   * Username:
   * - sólo letras (A–Z, a–z, Ñ/ñ), dígitos, punto o guión bajo,
   * - sin espacios,
   * - no puede empezar o terminar con punto/guión bajo,
   * - no puede tener “..” ni “__”.
   */
  validarUsernameKeypress(event: KeyboardEvent) {
    const char = event.key;
    const current: string = this.encargado.username;
    const newValue = current + char;

    // 1) Primera posición no puede ser punto ni guión bajo
    if (current.length === 0 && (char === '.' || char === '_')) {
      event.preventDefault();
      return;
    }

    // 2) Permitir sólo letras (A–Z, a–z, Ñ/ñ), dígitos, punto o guión bajo
    const allowed = /^[A-Za-z0-9._Ññ]$/;
    if (!allowed.test(char)) {
      event.preventDefault();
      return;
    }

    // 3) No permitir “..” ni “__”
    if (newValue.endsWith('..') || newValue.endsWith('__')) {
      event.preventDefault();
      return;
    }

    // 4) No permitir que último carácter sea punto o guión bajo: 
    //    (se verifica al enviar el formulario, pero evitamos dos casos extremos)
    if (current.length > 0 && (newValue.endsWith('.') || newValue.endsWith('_'))) {
      // no bloqueamos aquí del todo, porque quizás el usuario esté escribiendo texto;
      // de todas formas al enviar se validará que no termine así.
    }
  }

  bloquearPasteUsername(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text') || '';
    // Validar:
    //  • Primer caracter: letra (A–Z, a–z, Ñ/ñ) o dígito.
    //  • No espacios.
    //  • No puntos/guiones bajos al inicio o final.
    //  • No “..” ni “__” en toda la cadena.
    const valid = /^[A-Za-z0-9Ññ](?!.*[._]{2})[A-Za-z0-9._Ññ]*[A-Za-z0-9Ññ]$/;
    if (!valid.test(text)) {
      event.preventDefault();
    }
  }

  /**
   * Documento: sólo dígitos y no puede iniciar en “0”.
   */
  soloNumerosKeypress(event: KeyboardEvent) {
    const char = event.key;
    const current: string = this.encargado.numeroDocumento;

    // 1) Si no es dígito, bloquear
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
      return;
    }
    // 2) Primera posición no puede ser “0”
    if (current.length === 0 && char === '0') {
      event.preventDefault();
    }
  }
  soloNumerosPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text') || '';
    // Sólo dígitos y no empieza con “0”
    if (!/^[1-9][0-9]*$/.test(text)) {
      event.preventDefault();
    }
  }

  /**
   * Prefijo: debe ser exactamente “+57”.
   *   - Primera pulsación: sólo “+”
   *   - Segunda: sólo “5”
   *   - Tercera: sólo “7”
   *   - No permitir longitud > 3
   */
  validarPrefijoKeypress(event: KeyboardEvent) {
    const char = event.key;
    const current: string = this.encargado.prefijoTelefono;

    if (current.length === 0) {
      // sólo “+” en primer carácter
      if (char !== '+') {
        event.preventDefault();
      }
      return;
    }
    if (current.length === 1) {
      // sólo “5” como segundo carácter
      if (char !== '5') {
        event.preventDefault();
      }
      return;
    }
    if (current.length === 2) {
      // sólo “7” como tercer carácter
      if (char !== '7') {
        event.preventDefault();
      }
      return;
    }
    // no permitir más de 3 caracteres
    event.preventDefault();
  }
  bloquearPastePrefijo(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text') || '';
    if (text !== '+57') {
      event.preventDefault();
    }
  }

  /**
   * Teléfono: solo dígitos, exactamente 10 caracteres, y primer dígito “3”.
   */
  validarTelefonoKeypress(event: KeyboardEvent) {
    const char = event.key;
    const current: string = this.encargado.telefono;

    // 1) Sólo dígitos
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
      return;
    }
    // 2) Si es el primer carácter, debe ser “3”
    if (current.length === 0 && char !== '3') {
      event.preventDefault();
      return;
    }
    // 3) No permitir más de 10 dígitos
    if (current.length >= 10) {
      event.preventDefault();
    }
  }
  bloquearPasteTelefono(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text')?.trim() || '';
    // Debe ser 10 dígitos, empezar con “3” y sólo contener números
    if (!/^[3][0-9]{9}$/.test(text)) {
      event.preventDefault();
    }
  }
}
