import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureInnerPagesGuard } from 'src/app/shared/guards/secure-inner-pages.guard';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  {path: '', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
