import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoclacRoutingModule } from './poclac-routing.module';
import { RouterModule } from '@angular/router';
import { PoclacComponent } from './poclac.component';
import { Pregunta1Component } from './pregunta-1/pregunta-1.component';
import { HomePoclacComponent } from './home-poclac/home-poclac.component';


@NgModule({
  declarations: [
    PoclacComponent,
    Pregunta1Component,
    HomePoclacComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PoclacRoutingModule
  ]
})
export class PoclacModule { }
