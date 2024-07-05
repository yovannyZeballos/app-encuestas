import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from '../services/encuesta.service';
import { Encuesta } from '../models/encuesta.model';
import { EncuestaBaseComponent } from './encuesta-base/encuesta-base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html'
})
export class EncuestaComponent extends EncuestaBaseComponent implements OnInit {
  

  constructor(
    route: ActivatedRoute,
    private router: Router,
    encuestaService: EncuestaService,
    titleService: Title
  )  {
    super(encuestaService, route, titleService);
  }

  ngOnInit(): void {
    this.validarEncuesta();
  }

  empezar() {
    this.router.navigate(['/r/home', this.idEncuesta]);
  }

  validarEncuesta() {
    const encuesta = JSON.parse(localStorage.getItem('encuestaEnviada') || '{}');
    console.log(encuesta);
    
  }
}
