import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
///import * as firebase from 'firebase/app';
import { firebase } from '@firebase/app';
import { User } from '@firebase/auth-types';
import { Message } from './../chat/chat.component';
import { Subject,of,Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService implements OnDestroy {

  private user:Observable<User>;
  private userId:string;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router,private db:AngularFireDatabase) { 
    this.user = _firebaseAuth.authState;
    this.user.subscribe(usr=>{
      if(usr){
        this.userId = usr.uid;
        this.db.object(`loggedInUsers/${this.userId}`).update({'login':true});
      }
    });
  }
  ngOnDestroy(): void {
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
  /*authorizedUser():Subject<User>{
  return  this.userDetails;
  }*/
  get authorizedUser():Observable<User>{
    return this.user;
  }

  get isLoggedIn():boolean {
    return this.user !== null;
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
      this.db.object(`loggedInUsers/${this.userId}`).remove();
      this.router.navigate(['/']);
  });
  }
}
