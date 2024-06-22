import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoclacRoutingModule } from './poclac-routing.module';
import { RouterModule } from '@angular/router';
import { PoclacComponent } from './poclac.component';
import { Pregunta1Component } from './pregunta-1/pregunta-1.component';
import { HomePoclacComponent } from './home-poclac/home-poclac.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pregunta2Component } from './pregunta2/pregunta2.component';
import { Pregunta3Component } from './pregunta3/pregunta3.component';
import { Pregunta4Component } from './pregunta4/pregunta4.component';


@NgModule({
  declarations: [
    PoclacComponent,
    HomePoclacComponent,
    Pregunta1Component,
    Pregunta2Component,
    Pregunta3Component,
    Pregunta4Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    PoclacRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PoclacModule { }
