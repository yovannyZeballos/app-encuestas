import { Component } from '@angular/core';
import { EncuestaBaseComponent } from '../encuesta-base/encuesta-base.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../../services/encuesta.service';
import { RespuestaService } from '../../services/respuesta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent extends EncuestaBaseComponent {

  dni: string = '';
  formEnviado: boolean = false;
  respuesta: any = {};
  totalCorrectas: number = 0;
  totalPreguntas: number = 0;

  constructor(
    route: ActivatedRoute,
    encuestaService: EncuestaService,
    private respuestaService: RespuestaService,
    titleService: Title
  ) {
    super(encuestaService, route, titleService);
  }

  listar() {
    this.respuestaService.obtenerPorDni(this.dni, this.idEncuesta).subscribe({
      next: (respuesta: any) => {
        this.respuesta = respuesta;
        this.totalPreguntas = this.respuesta.respuestas.length;
        this.totalCorrectas  = this.respuesta.respuestas
            .map((r: any) => r.opciones)
            .reduce((a: any, b: any) => a.concat(b), [])
            .filter((o: any) => o.esCorrecta)
            .length;
            this.formEnviado = true;
      },
      error: (error: any) => {
        Swal.fire({
          title: "Advertencia!",
          text: error.error?.message || 'Ocurrió un error al consultar la encuesta',
          icon: "error",
          confirmButtonColor: '#001E57',
        });
        this.formEnviado = false;
      }
    });
  }

  verResultados() {
    if (this.dni === '') {
      Swal.fire({
        title: "Advertencia!",
        text: "Ingrese su DNI",
        icon: "error",
        confirmButtonColor: '#001E57',
      });
      return ;
    }
    this.listar();
  }

  limpiar() {
    this.dni = '';
    this.formEnviado = false;
    this.respuesta = {};
    this.totalCorrectas = 0;
    this.totalPreguntas = 0;
  }
}
