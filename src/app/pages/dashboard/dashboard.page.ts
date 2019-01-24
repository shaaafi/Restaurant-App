import { Component, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  cardInfo: any[] = [
    {
      title : 'All Products',
      para : 'See all of your products all at a glance',
      focusClass : false,
      path: '/all-products'
    },
    {
      title : 'Add Product',
      para : 'Add your new products',
      focusClass : false,
      path: '/admin-product-form'
    },
    {
      title : 'Update Product',
      para : 'Edit or Update the information of your existing products',
      focusClass : false,
      path: '/all-products'
    },
    {
      title : 'Remove Product',
      para : 'Remove your existing products',
      focusClass : false,
      path: '/all-products'
    },
  ];

  constructor(private donCtrl: DomController) { }

  ngOnInit() {

  }

  status(ev: any) {
    console.log('focus event:  ' + JSON.stringify(ev));
  }



}
