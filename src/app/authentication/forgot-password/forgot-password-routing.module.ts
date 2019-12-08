import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureInnerPagesGuard } from 'src/app/shared/guards/secure-inner-pages.guard';
import { ForgotPasswordComponent } from './forgot-password.component';


const routes: Routes = [
  {path: '', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
