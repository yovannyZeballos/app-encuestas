import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pregunta-1',
  templateUrl: './pregunta-1.component.html',
  styleUrl: './pregunta-1.component.css'
})
export class Pregunta1Component {
  
  nombreEncuestado = localStorage.getItem('nombreEncuestado') || '';
  nombreEncuestadoValido = false;

  constructor(private router: Router) {}

  siguiente(){
    localStorage.setItem('nombreEncuestado', this.nombreEncuestado);
    this.router.navigate(['/poclac/p2']);
  }
}
