import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';
import * as firebase from 'firebase';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Product Form',
      url: '/admin-product-form',
      icon: 'list-box'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'list-box'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afauth: AuthService,
    private fcm: FcmService,
    private userService: UserService
  ) {
    this.initializeApp();
    this.updateCurrentUser();
    this.fcm.showMessages().subscribe();
    this.fcm.getPermission().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#008000');
      this.splashScreen.hide();
      this.fcm.nativePushSetup();
    });
  }

  updateCurrentUser() {
    this.afauth.authState$.subscribe((user: firebase.User) => {
      console.log('Shouting from app component: ' + user);
    });
  }

  signout() {
    this.afauth.signout();
    console.log('You are signed out');
  }
}
