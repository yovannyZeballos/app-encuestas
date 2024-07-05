import { RespuestaDetalle } from "./respuesta-detalle.model"

export interface Respuesta {
    nombres: string
    correo: string
    idEncuesta: string
    detalles: RespuestaDetalle[]
  }