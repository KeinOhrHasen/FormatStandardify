import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpModule } from './authentication/sign-up/sign-up.module';

export const routes: Routes = [
    { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
    // { path: 'sign-in', loadChildren: SignUpModule},
    // { path: 'register-user', loadChildren: './authentication/sign-up/sign-up.module#SignUpModule'},
    // { path: 'converter', loadChildren: './converter/converter.module#ConverterModule' },
    // { path: 'forgot-password', loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordModule'},
    // { path: 'verify-email-address',  loadChildren: './authentication/verify-email/verify-email.module#VerifyEmailModule'},
    // { path: '**', loadComponent: NotFoundComponent},
];
