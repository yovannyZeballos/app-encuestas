import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoFeedbackService {
  private url = 'assets/data/tipo-feedback.json'; // URL a la API

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      map(tribus => tribus.find(tribu => tribu.id === id))
    );
  }
}