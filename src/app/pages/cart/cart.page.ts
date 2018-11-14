import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Cart } from '../../models/cart';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  totalQuantity: number;
  totalPrice: number;
  cart: Cart ;
  cartItems: CartItem[] ;
  prices: number[];
  constructor(private cartService: CartService, private afauth: AuthService) { }

  ngOnInit() {
   this.getItem();
  }

  getItem() {
    this.afauth.authState$.subscribe(r => {
       this.cartService.getCart(r.uid).subscribe(res => {
         this.cartItems = res;
         this.cart = new Cart(res);
         this.prices = this.cart.individualPrice();
         this.totalPrice = this.cart.totalPrice();
       });
    });
  }


}
