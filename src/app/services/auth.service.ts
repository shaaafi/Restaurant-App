import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<firebase.User>;
  public authState: any ;
  constructor(public afauth: AngularFireAuth, private facebook: Facebook) {
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

   facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
            console.log('Firebase success: ' + JSON.stringify(success));
          });

      }).catch((error) => { console.log(error); });
  }

}
