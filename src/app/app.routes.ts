import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'poclac',
        loadChildren: () =>
            import('./poclac/poclac.module').then((m) => m.PoclacModule),
    },
    {
        path: 'home',
        component: HomeComponent,
    }
];
