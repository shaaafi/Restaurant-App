import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { foodItem } from '../../models/foodItem';
import { FoodsService } from '../../services/foods.service';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  id: string ;
  textarea: string ;
  quantity: any ;
  item: foodItem ;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private foodService: FoodsService, private cartService: CartService, private afauth: AngularFireAuth) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.foodService.getItem(this.id).subscribe( r => {
      this.item = r ;
    });
  }

  addToCart() {
    console.log('clicked');
    const myCart: CartItem = new CartItem(this.item, this.quantity, this.textarea);
    this.cartService.addCart(myCart, this.afauth.auth.currentUser.uid, this.id);
  }

}
