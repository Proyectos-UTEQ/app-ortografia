import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { 
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    },
    // { 
    //     path: 'student',
    //     children: [
    //         { path: 'probando', component: ProbandoComponent },
    //         { path: '', redirectTo: 'probando', pathMatch: 'full' },
    //     ]
    // },
];
