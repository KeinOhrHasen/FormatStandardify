import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { SecureInnerPagesGuard } from 'src/app/shared/guards/secure-inner-pages.guard';

const routes: Routes = [
  {path: '', component: SignInComponent, canActivate: [SecureInnerPagesGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
