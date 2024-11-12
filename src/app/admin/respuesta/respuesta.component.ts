import { Component, OnInit } from '@angular/core';
import { RespuestaService } from '../../services/respuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

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

  detalle(id: number) {
    this.router.navigate(['/admin/r', this.idEncuesta, id]);
  }

  exportarExcel(): void {
    this.respuestaService.listarPorEncuesta(this.idEncuesta).subscribe((respuestas: any) => {
      this.respuestas = respuestas;
      this.generarArchivo();
    });
  }

  generarArchivo() {
    const nombreDelArchivo = this.nombreArchivo();
    const libroDeTrabajo: XLSX.WorkBook = XLSX.utils.book_new();
    const hojaDeCalculo: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.respuestas
    );

    // Definir el estilo de la cabecera
    const estiloCabecera = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '243658' } },
    };

    // Aplicar el estilo a las celdas de la cabecera
    const rango = XLSX.utils.decode_range(hojaDeCalculo['!ref'] as string); // Obtener el rango de celdas de la hoja

    for (let C = rango.s.c; C <= rango.e.c; ++C) {
      const direccionCelda = XLSX.utils.encode_col(C) + '1'; // Las cabeceras están en la primera fila
      if (!hojaDeCalculo[direccionCelda]) continue; // Si no existe la celda, continuar
      hojaDeCalculo[direccionCelda].s = estiloCabecera; // Aplicar el estilo
    }

    XLSX.utils.book_append_sheet(libroDeTrabajo, hojaDeCalculo, 'Datos');

    const opcionesDeEscritura: XLSX.WritingOptions = {
      bookType: 'xlsx',
      type: 'array',
    };

    const datosExcel: Blob = new Blob(
      [XLSX.write(libroDeTrabajo, opcionesDeEscritura)],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    );

    const enlaceDeDescarga: HTMLAnchorElement = document.createElement('a');
    enlaceDeDescarga.href = URL.createObjectURL(datosExcel);
    enlaceDeDescarga.download = `${nombreDelArchivo}.xlsx`;

    document.body.appendChild(enlaceDeDescarga);
    enlaceDeDescarga.click();
    document.body.removeChild(enlaceDeDescarga);
  }

  nombreArchivo() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // getMonth() devuelve un índice basado en cero, por lo tanto, se suma 1.
    const día = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const minuto = fechaActual.getMinutes();
    const segundo = fechaActual.getSeconds();
    const fechaFormateada = `${año}${mes < 10 ? '0' + mes : mes}${
      día < 10 ? '0' + día : día
    }_${hora < 10 ? '0' + hora : hora}${minuto < 10 ? '0' + minuto : minuto}${
      segundo < 10 ? '0' + segundo : segundo
    }`;
    return `Respuestas_${this.idEncuesta}_${fechaFormateada}`;
  }


}
