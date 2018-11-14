import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<firebase.User>;
  public authState: any ;
  constructor(public afauth: AngularFireAuth) {
    this.authState$ = this.afauth.authState;
    this.afauth.authState.subscribe( r => {
      this.authState = r ;
    });
   }

  signup(email: string, password: string) {
     return this.afauth.auth.createUserWithEmailAndPassword(email, password);
   }

  signin(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    return this.afauth.auth.signOut();
  }
}
