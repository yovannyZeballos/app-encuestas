import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RespuestaPoclacComponent } from './respuesta-poclac/respuesta-poclac.component';
import { AdminComponent } from './admin.component';
import { TruncatePipe } from '../pipe/truncate.pipe';


@NgModule({
  declarations: [
    RespuestaPoclacComponent,
    AdminComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
