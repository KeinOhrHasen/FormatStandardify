import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';
import { SecureInnerPagesGuard } from 'src/app/shared/guards/secure-inner-pages.guard';

const routes: Routes = [
  {path: '', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyEmailRoutingModule { }
