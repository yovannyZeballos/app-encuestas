import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url = 'https://api-encuestas.netlify.app/.netlify/functions/api';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/member`);
  }

  listarPorSquad(idSquad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/squad/${idSquad}/member`);
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/member/${id}`)
  }

}