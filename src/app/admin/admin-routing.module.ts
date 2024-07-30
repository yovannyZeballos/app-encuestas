import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaPoclacComponent } from './respuesta-poclac/respuesta-poclac.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'poclac',
    component: AdminComponent,
    children: [
      {
        path: 'listar',
        component: RespuestaPoclacComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
