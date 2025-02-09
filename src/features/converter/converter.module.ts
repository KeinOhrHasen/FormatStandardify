import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConverterComponent } from './converter.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // MatRadioModule,
    // MatButtonModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatIconModule,
    // MatTooltipModule,
    ConverterComponent,
  ],
})
export class ConverterModule {}
