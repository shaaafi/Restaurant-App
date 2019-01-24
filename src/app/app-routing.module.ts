import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: './pages/home/home.module#HomePageModule'
  },

  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule', canActivate: [UserGuard] },

  // tslint:disable-next-line:max-line-length
  { path: 'admin-product-form', loadChildren: './pages/admin-product-form/admin-product-form.module#AdminProductFormPageModule', canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-product-form/:id', loadChildren: './pages/admin-product-form/admin-product-form.module#AdminProductFormPageModule', canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-product', loadChildren: './pages/admin-product/admin-product.module#AdminProductPageModule', canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-order', loadChildren: './pages/admin-order/admin-order.module#AdminOrderPageModule', canActivate: [UserGuard, AdminGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule', canActivate: [UserGuard] },
  { path: 'order/:id', loadChildren: './pages/order/order.module#OrderPageModule', canActivate: [UserGuard] },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'admin_order_detail/:id', loadChildren: './pages/admin-order-detail/admin-order-detail.module#AdminOrderDetailPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'all-products', loadChildren: './pages/all-products/all-products.module#AllProductsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
