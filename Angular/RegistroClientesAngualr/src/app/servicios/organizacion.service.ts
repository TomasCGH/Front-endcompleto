import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrganizacionService {
  private seleccionada: 'IMMER' | 'INDER' | 'OLIMPO' | null = null;

  setOrganizacion(org: 'IMMER' | 'INDER' | 'OLIMPO') {
    this.seleccionada = org;
  }

  getOrganizacion(): 'IMMER' | 'INDER' | 'OLIMPO' | null {
    return this.seleccionada;
  }
}
