import { Routes } from '@angular/router';
import { PoclacComponent } from './poclac.component';
import { Pregunta1Component } from './pregunta-1/pregunta-1.component';
import { HomePoclacComponent } from './home-poclac/home-poclac.component';

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
            }
        ]
    }
];
