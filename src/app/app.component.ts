import { Component } from '@angular/core';
import { WindowSizeService } from './services/window-size.service';
import { enterTransition } from './animations/enter.animations';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [enterTransition]
})
export class AppComponent {
  joinForm = 'active';
  chatRoom = 'inactive';
  isloggedIn :boolean = false;
  userName: string;
  constructor(private windowSize: WindowSizeService,private authService:AuthService) {
   let authorizedUser =  authService.authorizedUser;
   authorizedUser.subscribe(
      user=>{
        if(user){
          this.isloggedIn =true;
        }else{
          this.isloggedIn = false;
        }
      }
   );
  }
  addUser(user: string) {
    this.chatRoom = this.trigger(this.chatRoom);
    this.joinForm = this.trigger(this.joinForm);
    this.userName = user;
  }

  trigger(value): string {
    return value === 'active' ? 'inactive' : 'active';
  }
  logOut():void{
    this.authService.logout();
  }
}
