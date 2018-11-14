import { Component, OnInit, OnDestroy } from '@angular/core';
import { foodItem } from '../../models/foodItem';
import { Subscription } from 'rxjs';
import { FoodsService } from '../../services/foods.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  items: foodItem[];
  subscription1: Subscription;
  searchedItem: foodItem[];
  constructor(private foodService: FoodsService) { }

  ngOnInit() {
    this.subscription1 = this.foodService.getItems()
     .subscribe(r => {
       this.items = r;
     });
  }

  search(ev: any) {

      const val = ev.target.value;

      if (val && val.trim() !== '') {
        this.searchedItem = this.items.filter((item: foodItem) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.searchedItem = [];
  }

}
