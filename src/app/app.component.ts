import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { FcmService } from './services/fcm.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

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

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afauth: AuthService,
    private fcm: FcmService,
    private push: Push
  ) {
    this.initializeApp();
    this.fcm.showMessages().subscribe();
    this.fcm.getPermission().subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
      this.nativePushSetup();
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

    });
  }

  signout() {
    this.afauth.signout();
    console.log('You are signed out');
  }

  nativePushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '636444625157',
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
   };

   const pushObject: PushObject = this.push.init(options);

   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
