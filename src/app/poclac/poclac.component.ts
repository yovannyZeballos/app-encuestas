import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-poclac',
  templateUrl: './poclac.component.html',
})
export class PoclacComponent implements OnInit {
  title = '2024-Q2 Encuesta PDI-POCLAC';
  anio = new Date().getFullYear();
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
