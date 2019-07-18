import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

  import { AngularFireFunctions } from '@angular/fire/functions';
  import { tap } from 'rxjs/operators';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmWithCapacitorService {

  constructor(private fun: AngularFireFunctions) { }

  subForCap(topic, token) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic: topic, token: token })
      .pipe(tap(() => console.log(`Subscribed to ${topic}`))).subscribe();
  }

  nativePushWithCapacitor() {
    PushNotifications.register();

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
         this.subForCap('newitem', token.value);
        console.log('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
