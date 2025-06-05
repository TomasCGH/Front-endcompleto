// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  organizaciones = [
    {
      nombre: 'IMMER',
      imagen: 'assets/immer.png',
      //dominio: '@immer.com'
    },
    {
      nombre: 'INDER',
      imagen: 'assets/inder.png',
      //dominio: '@inder.gov.co'
    },
    {
      nombre: 'OLIMPO',
      imagen: 'assets/Olimpo.png',
      //dominio: '@olimpo.org'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
   
    localStorage.removeItem('orgSeleccionada');
  }

  seleccionarOrg(org: any): void {
    // Guardamos la organización elegida en localStorage
    localStorage.setItem('orgSeleccionada', JSON.stringify(org));
    // Redirigimos a la pantalla de Dashboard
    this.router.navigate(['/dashboard']);
  }

  irARegistrar(): void {
    //  Este método solo será invocado si existe orgSeleccionada;
    //  en caso contrario, el Guard ya habrá alertado y redirigido al /login.
    this.router.navigate(['/registrar']);
  }
}
