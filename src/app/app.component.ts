import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConverterComponent} from '../features/converter/converter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'formatS';
}
