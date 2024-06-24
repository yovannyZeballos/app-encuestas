import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-poclac',
  template: ` 
  <div class="mx-10 mt-10">
    <h1 class="text-center text-primary mb-5"><b>{{title}}</b></h1>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class PoclacComponent implements OnInit {
  title = '2024 - Encuesta PDI-POCLAC';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
