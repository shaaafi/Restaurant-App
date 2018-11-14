import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  subscription: Subscription;
  constructor(private afauthService: AuthService, private navController: NavController, private storage: Storage) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): Observable<boolean> {
    return new Observable(observer => {
      this.subscription = this.afauthService.authState$.subscribe(r => {
        if (r) {
          observer.next(true);
          observer.complete();
          this.subscription.unsubscribe();
        } else {
           this.storage.set('returnUrl', url)
           .then(() => {
             this.navController.navigateForward('/login');
             observer.next(false);
             observer.complete();
             this.subscription.unsubscribe();
           });
        }
      });
    });

}

}
