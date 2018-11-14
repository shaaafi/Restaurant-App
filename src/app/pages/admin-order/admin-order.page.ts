import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../../services/admin-order.service';
import { AuthService } from '../../services/auth.service';
import { Orders, OrderName } from '../../models/order';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.page.html',
  styleUrls: ['./admin-order.page.scss'],
})
export class AdminOrderPage implements OnInit {

  orders: OrderName[];
  constructor(private orderService: AdminOrderService, private afauth: AuthService, private nav: NavController) {


      this.orderService.getOrders().subscribe(res => {
        const orders: Orders = new Orders(res);
        this.orders = orders.getOrders();
       // console.log(JSON.stringify(this.orders));
      });
    }


  ngOnInit() {
  }

  goToOrder(uid: string) {
    this.nav.navigateForward('/admin_order_detail/' + uid);
  }

}
