import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'poclac',
        loadChildren: () =>
            import('./poclac/poclac.module').then((m) => m.PoclacModule),
    },
    {
        path: 'r',
        loadChildren: () =>
            import('./encuesta/encuesta.module').then((m) => m.EncuestaModule),
    },
    {
        path: 'home',
        component: HomeComponent,
    }
];
