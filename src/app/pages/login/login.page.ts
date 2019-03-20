import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController, DomController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(private afauthService: AuthService, private navController: NavController, private storage: Storage) { }

  ngOnInit() {

  }


  signin() {
    this.afauthService.signin(this.email, this.password)
    .then(() => {
      this.storage.get('returnUrl')
      .then(r => {
        if (r) {
          this.navController.navigateRoot(r);
          this.storage.remove('returnUrl')
          .then(() => {
            console.log('You r signed in');
          });
        } else {
          this.navController.navigateRoot('/home');
          console.log('You r signed in');
        }
      });

    });
  }

  signinWithFb() {
    this.afauthService.facebookLogin()
    .then((credential) => {
      console.log('here is credential: ' + JSON.stringify(credential) );
      this.storage.get('returnUrl')
      .then(r => {
        if (r) {
          this.navController.navigateRoot(r);
          this.storage.remove('returnUrl')
          .then(() => {
            console.log('You r signed in with fb');
          });
        } else {
          this.navController.navigateRoot('/home');
          console.log('You r signed in with fb');
        }
      });

    }, () => {
      console.log('User not logged in');
    });
  }

  signinWithGoogle() {
    this.afauthService.googleLogin()
    .then((credential) => {
      console.log('here is credential: ' + JSON.stringify(credential) );
      this.storage.get('returnUrl')
      .then(r => {
        if (r) {
          this.navController.navigateRoot(r);
          this.storage.remove('returnUrl')
          .then(() => {
            console.log('You r signed in with google');
          });
        } else {
          this.navController.navigateRoot('/home');
          console.log('You r signed in with google');
        }
      });

    }, () => {
      console.log('User not logged in');
    });
  }


}
