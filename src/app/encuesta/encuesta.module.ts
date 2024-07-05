import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from './encuesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { HomeEncuestaComponent } from './home-encuesta/home-encuesta.component';
import { EncuestaBaseComponent } from './encuesta-base/encuesta-base.component';


@NgModule({
  declarations: [
    EncuestaComponent,
    PreguntasComponent,
    HomeEncuestaComponent,
    EncuestaBaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncuestaRoutingModule
  ]
})
export class EncuestaModule { }
