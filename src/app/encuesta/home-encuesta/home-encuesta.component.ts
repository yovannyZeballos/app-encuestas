import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta } from '../../models/encuesta.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaBaseComponent } from '../encuesta-base/encuesta-base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-encuesta',
  templateUrl: './home-encuesta.component.html',
  styleUrl: './home-encuesta.component.css'
})
export class HomeEncuestaComponent extends EncuestaBaseComponent{

  form: FormGroup;
  submitted = false;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    encuestaService: EncuestaService,
    titleService: Title
  ) {
    super(encuestaService, route, titleService);
    const nombres = localStorage.getItem('nombres') || '';
    const correo = localStorage.getItem('correo') || '';
    this.form = new FormGroup({
      nombres: new FormControl(nombres, Validators.required),
      correo: new FormControl(correo, [Validators.required, Validators.email]),
    });
  }

  siguiente() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    localStorage.setItem('nombres', this.form.value.nombres);
    localStorage.setItem('correo', this.form.value.correo);
    this.router.navigate(['/r/preguntas', this.idEncuesta]);
  }

  atras() {
    this.router.navigate(['/r', this.idEncuesta]);
  }
}
