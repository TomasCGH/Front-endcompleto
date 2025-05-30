import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8081/api/v1/clientes';  // Asegúrate de usar el mismo puerto del backend

  constructor(private http: HttpClient) {}

  registrarCliente(cliente: ClienteDTO): Observable<string> {
    return this.http.post(this.apiUrl, cliente, { responseType: 'text' });
  }
}

export interface ClienteDTO {
  nombre: string;
  username: string;
  contrasena: string;
  prefijoTelefono: string;
  telefono: string;
}

