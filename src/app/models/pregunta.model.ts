import { Opcion } from "./opcion.model"

export interface Pregunta {
[x: string]: any
    id: number
    descripcion: string
    multipleRespuestas: boolean
    opciones: Opcion[],
    numero: number
  }