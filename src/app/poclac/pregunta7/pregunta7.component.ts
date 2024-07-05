import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespuestaService } from '../../services/respuesta.service';
import { Router } from '@angular/router';
import { concatMap, from } from 'rxjs';

@Component({
  selector: 'app-pregunta7',
  templateUrl: './pregunta7.component.html',
  styleUrl: './pregunta7.component.css',
})
export class Pregunta7Component implements OnInit {
  loading = false;
  finalizado = false;

  constructor(
    private encuestaService: RespuestaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  finalizar() {
    this.loading = true;
    const idSquad = Number(localStorage.getItem('squad')) ?? 0;
    const nombreEncuestado = localStorage.getItem('nombreEncuestado') || '';
    const correoEncuestado = localStorage.getItem('correoEncuestado') || '';
    const idRol = localStorage.getItem('rol') || '';

    const miembros = Object.keys(localStorage)
      .filter((clave) => clave.startsWith('member_'))
      .map((clave) => JSON.parse(localStorage.getItem(clave) || '{}'));

    from(miembros)
      .pipe(
        concatMap(({ member, feedback }) =>
          this.encuestaService.crearPoclac({
            nombreEncuestado,
            idRol,
            idMember: member.id,
            idSquad,
            puntajeGeneral: feedback.general,
            desempeñoComo: feedback.como,
            desempeñoQue: feedback.que,
            feedbackApreciativo: feedback.feedbackApreciativo,
            feedbackConstructivo: feedback.feedbackConstructivo,
            correoEncuestado: correoEncuestado,
          })
        )
      )
      .subscribe({
        complete: () => {
          this.loading = false;
          this.finalizado = true;
          localStorage.clear();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
      });
  }
}
