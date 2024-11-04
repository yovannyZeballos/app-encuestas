import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaPoclacComponent } from './respuesta-poclac/respuesta-poclac.component';
import { AdminComponent } from './admin.component';
import { RespuestaComponent } from './respuesta/respuesta.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'listar-poclac',
        component: RespuestaPoclacComponent,
      },
      {
        path: 'r/:idEncuesta',
        component: RespuestaComponent,
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
