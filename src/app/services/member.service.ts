import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url = 'assets/data/members.json';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  listarPorSquad(idSquad: number): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(members => members.filter(member => member.idSquad === idSquad))
    );
  }

  obtener(id: number): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      map(members => members.find(member => member.id === id))
    );
  }

}