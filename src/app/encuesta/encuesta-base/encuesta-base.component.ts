import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta } from '../../models/encuesta.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PreguntasComponent } from '../preguntas/preguntas.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-encuesta-base',
  templateUrl: './encuesta-base.component.html',
  styleUrl: './encuesta-base.component.css',
})
export class EncuestaBaseComponent implements OnDestroy {
  idEncuesta: string = '';
  idEncuestaValida: boolean = true;
  encuestaEnviada: boolean = false;
  anio: number = new Date().getFullYear();
  encuesta: Encuesta = {
    id: '',
    titulo: '',
    subtitulo: '',
    descripcion: '',
    estado: true,
    paginas: [],
    preguntasAleatorias: false,
    opcionesAleatorias: false,
  };

  constructor(
    protected encuestaService: EncuestaService,
    protected route: ActivatedRoute,
    protected titleService: Title
  ) {

    this.titleService.setTitle('Aplicación de Encuestas');

    window.addEventListener('beforeunload', this.confirmarRecarga);
    this.idEncuesta = this.route.snapshot.paramMap.get('idEncuesta') || '';

    if (!this.validarEncuestaEnviada()) {
      this.obtenerEncuesta();
    }

  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.confirmarRecarga);
  }

  confirmarRecarga(event: BeforeUnloadEvent) {
    const mensaje =
      '¿Estás seguro de que quieres recargar la página? Los cambios no guardados se perderán.';
    event.returnValue = mensaje; // Estándar para la mayoría de los navegadores
    return mensaje; // Para algunos navegadores más antiguos
  }

  obtenerEncuesta() {
    this.encuestaService.obtener(this.idEncuesta).subscribe({
      next: (data) => {
        this.encuesta = data;
        this.idEncuestaValida = true;
        this.titleService.setTitle(this.encuesta.titulo);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.idEncuestaValida = false;
        }
      },
    });
  }

  validarEncuestaEnviada() {
    let encuestaEnv = { id: '', enviado: false };
    encuestaEnv = JSON.parse(
      localStorage.getItem('encuestaEnviada') || '{}'
    );
    
    this.encuestaEnviada = encuestaEnv.id === this.idEncuesta && encuestaEnv.enviado;
    return this.encuestaEnviada;
  }
}
