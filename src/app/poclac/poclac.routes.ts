import { Routes } from '@angular/router';
import { PoclacComponent } from './poclac.component';
import { Pregunta1Component } from './pregunta-1/pregunta-1.component';
import { HomePoclacComponent } from './home-poclac/home-poclac.component';
import { Pregunta2Component } from './pregunta2/pregunta2.component';
import { Pregunta3Component } from './pregunta3/pregunta3.component';
import { Pregunta4Component } from './pregunta4/pregunta4.component';
import { Pregunta5Component } from './pregunta5/pregunta5.component';
import { Pregunta6Component } from './pregunta6/pregunta6.component';
import { Pregunta7Component } from './pregunta7/pregunta7.component';

export const routes: Routes = [
    {
        path: '',
        component: PoclacComponent,
        children: [
            {
                path: 'home',
                component: HomePoclacComponent
            },
            {
                path: 'p1',
                component: Pregunta1Component
            },
            {
                path: 'p2',
                component: Pregunta2Component
            },
            {
                path: 'p3',
                component: Pregunta3Component
            },
            {
                path: 'p4',
                component: Pregunta4Component
            },
            {
                path: 'p5',
                component: Pregunta5Component
            },
            {
                path: 'p6',
                component: Pregunta6Component
            },
            {
                path: 'p7',
                component: Pregunta7Component
            }
        ]
    }
];
