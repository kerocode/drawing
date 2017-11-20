import { Component } from '@angular/core';
import { WindowSizeService } from './services/window-size.service';
import { enterTransition } from './animations/enter.animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [enterTransition]
})
export class AppComponent {
  joinForm = 'active';
  chatRoom = 'inactive';
  constructor(private windowSize: WindowSizeService) {

  }
  addUser(user: string) {
    this.chatRoom = this.trigger(this.chatRoom);
    this.joinForm = this.trigger(this.joinForm);
  }

  trigger(value): string {
    return value === 'active' ? 'inactive' : 'active';
  }
}
