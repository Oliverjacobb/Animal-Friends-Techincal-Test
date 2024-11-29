import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent, title: 'Users' },
    { path: '**', redirectTo: 'users' },
];
