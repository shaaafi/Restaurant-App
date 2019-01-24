import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { FoodsService } from '../../services/foods.service';
import { Subscription } from 'rxjs';
import { foodItem } from '../../models/foodItem';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  subscription: Subscription ;
  subscription1: Subscription;
  uid = '' ;
  quantity: number;
  authstate: any;
  items: foodItem[];
  
  // tslint:disable-next-line:max-line-length
  constructor(private popOver: PopoverController, private foodService: FoodsService, private navController: NavController, private afauth: AuthService, private cartService: CartService, private a: AngularFireAuth) {
    this.subscription = this.afauth.authState$.subscribe(r => {
      this.authstate = r;
      if (r) {
        this.uid = r.uid;
        this.getQuantity() ;
      } else {
        this.quantity = null;
      }

    });

  }

  ngOnInit() {
    this.subscription1 = this.foodService.getItems()
     .subscribe(r => {
       this.items = r;
     });

  }

  async popover(ev: any) {
    const pop = await this.popOver.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });
    return await pop.present();
  }

  goLogin() {
    this.navController.navigateForward('/login');
  }

  getQuantity() {
    console.log(this.uid);
    this.cartService.getCart(this.uid)
    .subscribe(r => {
      console.log(JSON.stringify(r));
      const cart: Cart = new Cart(r);
      this.quantity = cart.totalQuantity();
      console.log('Here is: ' + this.quantity);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

}
