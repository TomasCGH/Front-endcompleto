// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orgSeleccionada: { nombre: string; imagen?: string; dominio?: string } | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const orgJson = localStorage.getItem('orgSeleccionada');
    if (orgJson) {
      this.orgSeleccionada = JSON.parse(orgJson);
    }
  }

  /**
   * Navega a la ruta /registrar. 
   * Si no hay organización válida en localStorage, el RegistroGuard
   * (configurado en el router) se encargará de bloquear el acceso y mostrar alerta.
   */
  irARegistrar(): void {
    this.router.navigate(['/registrar']);
  }

  /**
   * Para botones que aún no estén implementados. 
   * Muestra un mensaje genérico de “no disponible”.
   */
  mostrarMensajeNoDisponible(): void {
    alert('⚠️ Funcionalidad todavía no implementada.');
  }

  /**
   * (Opcional) Para cerrar sesión y limpiar la organización seleccionada.
   */
  logout(): void {
    localStorage.removeItem('orgSeleccionada');
    this.router.navigate(['/login']);
  }
}
