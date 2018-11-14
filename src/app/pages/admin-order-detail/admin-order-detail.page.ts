import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../../services/admin-order.service';
import { Order } from '../../models/orderItem' ;
import { CompleteOrderService } from '../../services/complete-order.service';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.page.html',
  styleUrls: ['./admin-order-detail.page.scss'],
})
export class AdminOrderDetailPage implements OnInit {

  uid: string;
  order: Order;
  orderItems: any[] = [];
  totalQuantity: number;
  totalPrice: number;
  cart: Cart ;
  cartItems: CartItem[] ;
  prices: number[];
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private adminOrderService: AdminOrderService, private completeOrderService: CompleteOrderService) { }

  ngOnInit() {
   this.uid = this.route.snapshot.paramMap.get('id');
    this.adminOrderService.getOrder(this.uid)
    .subscribe(r => {
      console.log(r[0]);
      (<any>this.order) = r[0];
      this.cart = new Cart(this.order.items);
      this.prices = this.cart.individualPrice();
      this.totalPrice = this.cart.totalPrice();
    });
  }

  completeOrder() {
    this.completeOrderService.addOrder(this.order);
  }

}
