import { Component, OnInit, OnDestroy } from '@angular/core';
import { foodItem } from '../../models/foodItem';
import { Subscription } from 'rxjs';
import { FoodsService } from '../../services/foods.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit, OnDestroy {

  subscription: Subscription ;
  items: foodItem[];

  constructor(private foodService: FoodsService, public loadingController: LoadingController) { }

 async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading Products...',
      spinner: 'circles',
      translucent: true,

    });
     await loading.present();

    this.subscription = this.foodService.getItems()
     .subscribe(r => {
       this.items = r;
       loading.dismiss();
     });
  }



  remove(uid: string) {
  this.foodService.removeItem(uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
