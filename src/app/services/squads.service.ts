import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadService {
  private url = 'assets/data/squads.json';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  listarPorTribu(idTribu: number): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(squads => squads.filter(squad => squad.idTribu === idTribu))
    );
  }
}