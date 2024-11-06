import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  constructor(private location: Location) {}

  volver() {
    this.location.back();
  }
}
