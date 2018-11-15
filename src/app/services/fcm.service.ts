import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as app from 'firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastController: ToastController,
    private push: Push
  ) {
    /*
    this.afMessaging.messaging.subscribe(messaging => {
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      messaging.onMessage = messaging.onMessage.bind(messaging);
    });
    */

    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      // tslint:disable-next-line:no-unused-expression
    } catch (e) {
      console.log(e);
    }
  }

  getPermission(): Observable<any> {
    return this.afMessaging.requestToken.pipe(
      tap(token => {
        this.token = token;
        this.sub('newitem');
      })
    );
  }

  showMessages() {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        this.makeToast(body);
      })
    );
  }

  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'dismiss'
    });
    toast.present();
  }

  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(() => this.makeToast(`Subscribed to ${topic}`)));
  }

  unsub(topic) {
    this.fun
      .httpsCallable(' unsubscribeToTopic')({ topic, token: this.token })
      .pipe(tap(() => this.makeToast(`Unsubscribed From ${topic}`)));
  }

  nativePushSetup() {
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');

        const options: PushOptions = {
          android: {
            senderID: '636444625157',
            topics: ['newitem'],
            forceShow: 'true'
          },
          ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
          }
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('registration').subscribe((registration: any) => {
          console.log('Device registered', registration);
        });

        pushObject
          .on('notification')
          .subscribe((notification: any) =>
            console.log('Received a notification', notification)
          );

        pushObject
          .on('error')
          .subscribe(error => console.error('Error with Push plugin', error));
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });
  }
}
