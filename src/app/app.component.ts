import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
 import { FcmService } from './services/fcm.service';
import * as firebase from 'firebase';
import { UserService } from './services/user.service';
import { Plugins } from '@capacitor/core';
import { FcmWithCapacitorService } from './services/fcm-with-capacitor.service';
const { SplashScreen, StatusBar } = Plugins;

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
      title: 'Orders',
      url: '/admin-order',
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
    private afauth: AuthService,
    private fcm: FcmService,
    private userService: UserService,
    private fcmCap: FcmWithCapacitorService
  ) {
    this.initializeApp();
    this.updateCurrentUser();
    this.fcm.showMessages().subscribe();
   this.fcm.getPermission().subscribe();

  }

  initializeApp() {
    if (this.platform.is('android')) {
      SplashScreen.hide();
    StatusBar.show();
   // this.fcm.nativePushSetup();
    this.fcmCap.nativePushWithCapacitor();
    }
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
