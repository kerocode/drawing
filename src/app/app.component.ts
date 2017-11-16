import { Component } from '@angular/core';
import { WindowSizeService } from './services/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private windowSize: WindowSizeService) {

  }
}
