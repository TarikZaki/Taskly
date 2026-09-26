import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Notfound } from './features/auth/notfound/notfound';
import { Register } from './features/auth/register/register';
import { AppLayout } from './layout/app-layout/app-layout';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
    {
        path: '', component: PublicLayout,
        children: [
            { path: 'sign-up', component: Register },
            { path: 'login', component: Login },
        ]
    },
    {
        path: 'app',
        component: AppLayout,
        children: [

        ],
    },

    { path: '**', component: Notfound },
];
