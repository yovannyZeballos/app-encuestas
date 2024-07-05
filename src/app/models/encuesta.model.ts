import { Pagina } from "./pagina.model";

export interface Encuesta {
    titulo: string,
    subtitulo: string,
    descripcion: string,
    estado: boolean,
    preguntasAleatorias: boolean,
    opcionesAleatorias: boolean,
    paginas: Pagina[]
  }