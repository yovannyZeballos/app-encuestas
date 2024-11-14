import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
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
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        component: AuthComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
