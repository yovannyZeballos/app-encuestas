import { Pagina } from "./pagina.model";

export interface Encuesta {
    id: string,
    titulo: string,
    subtitulo: string,
    descripcion: string,
    estado: boolean,
    preguntasAleatorias: boolean,
    opcionesAleatorias: boolean,
    paginas: Pagina[]
  }