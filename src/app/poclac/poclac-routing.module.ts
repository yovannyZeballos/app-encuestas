import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './poclac.routes';


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoclacRoutingModule { }
