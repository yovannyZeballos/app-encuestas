import { Pregunta } from "./pregunta.model"

export interface Pagina {
    id: number
    titulo: string
    descripcion: string
    preguntas: Pregunta[]
  }