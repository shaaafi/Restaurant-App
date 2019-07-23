import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { PopoverPageModule } from './pages/popover/popover.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN, FUNCTIONS_REGION } from '@angular/fire/functions';

// import { Push } from '@ionic-native/push/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    PopoverPageModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireMessagingModule,
    AngularFireFunctionsModule
  ],
  providers: [
   // Push,
   { provide: FUNCTIONS_ORIGIN, useValue: 'https://us-central1-myionicshop-693bc.cloudfunctions.net/subscribeToTopic' },
   { provide: FUNCTIONS_REGION, useValue: 'us-central1' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
