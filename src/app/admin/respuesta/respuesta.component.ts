import { Component, OnInit } from '@angular/core';
import { RespuestaService } from '../../services/respuesta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent  implements OnInit {

  title: string = 'Respuestas';
  idEncuesta: string = '';
  respuestas: any[] = [];

  ngOnInit(): void {
    this.listar();
  }

  constructor(private respuestaService:RespuestaService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.idEncuesta = this.route.snapshot.paramMap.get('idEncuesta') || '';
  }

  listar() {
    this.respuestaService.listarPorEncuesta(this.idEncuesta).subscribe((respuestas: any) => {
      this.respuestas = respuestas;
    });
  }

  exportarExcel(){
    
  }

  detalle(id: number) {
    this.router.navigate(['/admin/r', this.idEncuesta, id]);
  }

  

}
