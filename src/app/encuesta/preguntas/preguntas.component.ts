import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from '../../services/encuesta.service';
import { Pagina } from '../../models/pagina.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Respuesta } from '../../models/respuesta.mode';
import { RespuestaDetalle } from '../../models/respuesta-detalle.model';
import { RespuestaService } from '../../services/respuesta.service';
import { EncuestaBaseComponent } from '../encuesta-base/encuesta-base.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent extends EncuestaBaseComponent implements OnInit {
  cantidadPaginas = 0;
  paginaActual: Pagina | null = null;
  form: FormGroup;
  indicePagina = 0;
  indicePregunta = 1;
  textoBoton = 'Sig.';
  submitted = false;
  enviado: boolean = false;
  nombres: string = '';
  correo: string = '';

  constructor(
    route: ActivatedRoute,
    private router: Router,
    encuestaService: EncuestaService,
    private fb: FormBuilder,
    private respuestaService: RespuestaService,
    titleService: Title
  ) {
    super(encuestaService, route, titleService);
    this.form = fb.group({});
    // this.form = this.fb.group({
    //   preguntas: this.fb.array([]),
    // });
  }

  ngOnInit(): void {
    this.validarPagina();

    this.obtenerEncuesta();

    // Opción 2: Suscribirse a los cambios de parámetros si idEncuesta puede cambiar
    // this.route.paramMap.subscribe(params => {
    //   this.idEncuesta = params.get('idEncuesta');
    // });
  }

  validarPagina(){
    this.nombres = localStorage.getItem('nombres') || '';
    this.correo = localStorage.getItem('correo') || '';

    if(this.nombres === '' || this.correo === ''){
      this.router.navigate(['/r/home', this.idEncuesta]);
    }
  }

  get respuestas(): FormArray {
    return this.form.get('respuestas') as FormArray;
  }

  override obtenerEncuesta() {
    this.encuestaService.preguntas(this.idEncuesta).subscribe({
      next: (data) => {
        this.encuesta = data;
        this.agregrarNumeroPagina();
        this.mostrarPagina(this.indicePagina);
        this.idEncuestaValida = true;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.idEncuestaValida = false;
          console.log('Encuesta no encontrada xx');
        }
      },
    });

  }

  mostrarPagina(indice: number) {
    if (!this.encuesta.paginas || this.encuesta.paginas.length === 0) {
      return;
    }

    this.cantidadPaginas = this.encuesta.paginas.length;
    this.paginaActual = this.encuesta.paginas[indice];

    if (this.cantidadPaginas === 1) {
      this.textoBoton = 'Finalizar';
    }

    this.paginaActual?.preguntas.forEach((pregunta) => {
      if (this.encuesta.opcionesAleatorias) {
        pregunta.opciones = this.mezclar(pregunta.opciones);
      }

      if (pregunta.multipleRespuestas) {
        pregunta.opciones.forEach((op) => {
          this.form.addControl(
            pregunta.id.toString() + '-' + op.id.toString(),
            this.fb.control(null, Validators.required)
          );
        });
      } else {
        this.form.addControl(
          pregunta.id.toString(),
          this.fb.control(null, Validators.required)
        );
      }
    });
  }

  agregrarNumeroPagina() {
    let numero = 1;
    this.encuesta.paginas.forEach((pagina: any) => {
      if (this.encuesta.preguntasAleatorias) {
        pagina.preguntas = this.mezclar(pagina.preguntas);

        pagina.preguntas.forEach((pregunta: any) => {
          pregunta.numero = numero;
          numero++;
        });
      }
    });
  }

  siguiente() {
    this.indicePregunta += this.paginaActual?.preguntas.length || 0;
    this.indicePagina++;

    if (this.indicePagina + 1 === this.cantidadPaginas) {
      this.textoBoton = 'Finalizar';
    }

    if (this.indicePagina === this.cantidadPaginas) {
      this.indicePagina = this.cantidadPaginas - 1;
      this.finalizar();
      return;
    }

    this.mostrarPagina(this.indicePagina);
  }

  atras() {
    this.indicePregunta -= this.paginaActual?.preguntas.length || 0;
    this.indicePagina--;

    this.textoBoton = 'Sig.';

    if (this.indicePagina < 0) {
      this.indicePagina = 0;
      this.router.navigate(['/r/home', this.idEncuesta]);
      return;
    }

    this.mostrarPagina(this.indicePagina);
  }

  visibleBotonAtras() {
    return this.indicePagina > 0;
  }

  finalizar() {
    this.submitted = true;

    if (this.form.invalid) {
      Swal.fire({
        title: "Advertencia!",
        text: "No has respondido todas las preguntas que son obligatorias.",
        icon: "error",
        confirmButtonColor: '#001E57',
      });
      return;
    }

    const respuesta: Respuesta = {
      correo: localStorage.getItem('correo') || '',
      nombres: localStorage.getItem('nombres') || '',
      idEncuesta: this.idEncuesta,
      detalles: this.generarListaDetalles(this.form.value),
    };

    this.respuestaService.crear(respuesta).subscribe({
      next: (res) => {
        this.enviado = true;
        localStorage.clear();
        localStorage.setItem(
          'encuestaEnviada',
          JSON.stringify({ id: this.idEncuesta, enviado: true })
        );
      },
      error: (error: any) => {
        Swal.fire({
          title: "Advertencia!",
          text: error.error?.message || 'Ocurrió un error al enviar la encuesta.',
          icon: "error",
          confirmButtonColor: '#001E57',
        });
      }
    });
  }

  mezclar(data: any[]): any[] {
    return data.sort(() => Math.random() - 0.5);
  }

  generarListaDetalles(objeto: { [key: string]: number }): RespuestaDetalle[] {
    return Object.entries(objeto).map(([idPregunta, idOpcion]) => ({
      idPregunta: parseInt(idPregunta),
      idOpcion,
    }));
  }
}
