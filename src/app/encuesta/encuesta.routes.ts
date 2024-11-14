import { Routes } from '@angular/router';
import { EncuestaComponent } from './encuesta.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { HomeEncuestaComponent } from './home-encuesta/home-encuesta.component';
import { RespuestasComponent } from './respuestas/respuestas.component';

export const routes: Routes = [
    {
        path: ':idEncuesta',
        component: EncuestaComponent
    },
    {
        path: 'home/:idEncuesta',
        component: HomeEncuestaComponent
    },
    {
        path: 'preguntas/:idEncuesta',
        component: PreguntasComponent
    },
    {
        path: 'respuestas/:idEncuesta',
        component: RespuestasComponent
    }
];
