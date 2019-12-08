import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './converter.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ConverterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConverterRoutingModule { }
