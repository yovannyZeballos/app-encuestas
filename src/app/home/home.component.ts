import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EncuestaService } from '../services/encuesta.service';
import { Encuesta } from '../models/encuesta.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = 'Aplicación de encuestas';
  encuestas: Encuesta[] = [];

  constructor(private titleService: Title,
    private encuestaService: EncuestaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.listar();
  }

  listar() {
    this.encuestaService.listar().subscribe({
      next: (data: Encuesta[]) => {
        this.encuestas = data;
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  irEncuesta(id:string) {
    this.router.navigate(['/r', id]);
  }
}
