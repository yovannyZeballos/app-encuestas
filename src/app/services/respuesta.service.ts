import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Respuesta } from '../models/respuesta.mode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url = environment.api;

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  crearPoclac(respuesta: any): Observable<any> {
    return this.http.post<any>(this.url + '/respuesta-poclac', respuesta);
  }

  crear(respuesta: Respuesta): Observable<any> {
    return this.http.post<any>(this.url + '/respuesta', respuesta);
  }

  listarPoclac(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/admin/listar-poclac');
  }

  listarPorEncuesta(idEncuesta: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/admin/listar-resultados/${idEncuesta}`).pipe(
      map(resultados => resultados.map(resultado => {
        resultado.fecha = new Date(new Date(resultado.fecha).getTime() - 5 * 60 * 60 * 1000).toISOString();
        return resultado;
      }))
    );
  }

  obtenerPorId(id: number, idEncuesta:string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/admin/respuesta/' + idEncuesta + '/' + id);
  }

  obtenerPorDni(dni: string, idEncuesta:string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/respuesta/' + idEncuesta + '/' + dni);
  }

}