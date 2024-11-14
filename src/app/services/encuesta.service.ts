import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private url = environment.api + '/encuesta';

  constructor(private http: HttpClient) { }

  obtener(id:string): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.url}/${id}`);
  }

  preguntas(id:string): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.url}/${id}/preguntas`);
  }

  listar(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.url);
  }
}