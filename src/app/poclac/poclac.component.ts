import { Component } from '@angular/core';

@Component({
  selector: 'app-poclac',
  template: `
  <div class="mx-10 mt-10">
    <h1 class="text-center text-primary mb-5"><b>{{title}}</b></h1>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class PoclacComponent {
  title = 'Encuesta PDI-POCLAC';
}
