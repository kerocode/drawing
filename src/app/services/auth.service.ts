import { Injectable, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, } from 'rxjs/Observable'
import { Message } from './../chat/chat.component';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/subject';
@Injectable()
export class AuthService implements OnDestroy {

  private user: Observable<firebase.User>;
  private userDetails:Subject<firebase.User>; 
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
    this.userDetails = new Subject();
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
          if(user){
            this.userDetails.next(user);
          }else{
            this.userDetails.next(null);
          }         
          console.log('user details',this.userDetails);
      }
    );
  }
  ngOnDestroy(): void {
    this.userDetails.unsubscribe();
  }
  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }


  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
  authorizedUser():Subject<firebase.User>{
  return  this.userDetails;
 }

  isLoggedIn():boolean {
  if (this.userDetails == null ) {
      return false;
    }
    return true;
  }

  signUp(email:string,password:string):Promise<any>{
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(value=>{
      console.log('Success!',value);
    //  this.userDetails = Observable.of(value);
      this.router.navigate(['/draw']);
    })
    .catch(err=>{
      console.log('error',err.message);
    })
  }
  logIn(email: string, password: string):Promise<any> {
    return this._firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!',value);
    //    this.userDetails = Observable.of(value);
        this.router.navigate(['/draw']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => {
      this.userDetails.next(null);
      this.router.navigate(['/']);
  });
  }
}
