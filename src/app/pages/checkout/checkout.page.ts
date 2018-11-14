import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ShippingAddress } from '../../models/shippingAddress';
import { AdminOrderService } from '../../services/admin-order.service';
import { Order } from '../../models/orderItem';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  totalQuantity: number;
  totalPrice: number;
  cart: Cart ;
  cartItems: CartItem[] ;
  prices: number[];
  home: string;
  flat: string;
  road: string;
  region: string;
  district: string;
  division: string;
  uid: string;
  name: string;

  // tslint:disable-next-line:max-line-length
  constructor(private cartService: CartService, private afauth: AuthService, private orderService: AdminOrderService) { }

  ngOnInit() {
   this.getItem();
  }

  getItem() {
    this.afauth.authState$.subscribe(r => {
        this.uid = r.uid;
       this.cartService.getCart(r.uid).subscribe(res => {
         this.cartItems = res;
         this.cart = new Cart(res);
         this.prices = this.cart.individualPrice();
         this.totalPrice = this.cart.totalPrice();
       });
    });
  }

  placeOrder() {
    const time = new Date();
    // tslint:disable-next-line:max-line-length
    const address: ShippingAddress = new ShippingAddress(this.name, this.home, this.flat, this.road, this.region, this.district, this.division);
    const order: Order = new Order(address, this.cartItems, this.uid, time.getTime());
    this.orderService.addOrder(order);
  }


}
