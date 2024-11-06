import { Component, OnInit } from '@angular/core';
import { RespuestaService } from '../../services/respuesta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-respuesta-detalle',
  templateUrl: './respuesta-detalle.component.html',
  styleUrl: './respuesta-detalle.component.css'
})
export class RespuestaDetalleComponent implements OnInit {

  idEncuesta: string = '';
  id: number = 0;
  respuestas: any[] = [];

  constructor(private respuestaService:RespuestaService,
    private route: ActivatedRoute
  ) { 
    this.idEncuesta = this.route.snapshot.paramMap.get('idEncuesta') || '';
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
  }
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.respuestaService.obtenerPorId(this.id, this.idEncuesta).subscribe((respuestas: any) => {
      this.respuestas = respuestas;
      console.log(this.respuestas);
    });
  }

}
