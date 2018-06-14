import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate():boolean {
    if  (!this.authService.isLoggedIn) {
      this.router.navigate(['log-in']);
      return false;
    }
    return true;
  }
}
