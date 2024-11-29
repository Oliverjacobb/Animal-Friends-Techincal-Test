import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadComponent: () => import('./user/user-list/user-list.component').then(m => m.UserListComponent),
        title: 'Users'
    },
    {
        path: 'user/:uuid',
        loadComponent: () => import('./user/user-detail/user-detail.component').then(m => m.UserDetailComponent),
        title: 'User Details'
    },
    { path: '**', redirectTo: 'users', pathMatch: 'full' },
];
