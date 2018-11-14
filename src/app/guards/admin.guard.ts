import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  subscription: Subscription;
  constructor(private userService: UserService, private afauth: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.isAdmin();
  }

  isAdmin(): Promise<boolean> {
    return new Promise( resolve => {
      this.afauth.authState$.subscribe(r => {
        this.subscription = this.userService.getUser(r.uid)
     .subscribe(res => {
      if (res.isAdmin) {
        resolve(true);
        this.subscription.unsubscribe();
      } else {
        resolve(false);
        this.subscription.unsubscribe();
      }
     });
      });
    });

  }

}
