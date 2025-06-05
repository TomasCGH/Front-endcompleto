import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EncargadoDTO {
  nombre: string;
  username: string;
  contrasena: string;
  prefijoTelefono: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
  organizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncargadoService {
  private apiUrl = 'http://localhost:8081/api/v1/encargados';

  constructor(private http: HttpClient) {}

  registrarEncargado(encargado: EncargadoDTO): Observable<string> {
    return this.http.post(this.apiUrl, encargado, {
      responseType: 'text' as 'json'
    }) as unknown as Observable<string>;
  }
}
