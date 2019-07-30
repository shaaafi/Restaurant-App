import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
// import { QuicklinkStrategy, QuicklinkModule} from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule), canActivate: [UserGuard] },

  // tslint:disable-next-line:max-line-length
  { path: 'admin-product-form', loadChildren: () => import('./pages/admin-product-form/admin-product-form.module').then(m => m.AdminProductFormPageModule), canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-product-form/:id', loadChildren: () => import('./pages/admin-product-form/admin-product-form.module').then(m => m.AdminProductFormPageModule), canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-product', loadChildren: () => import('./pages/admin-product/admin-product.module').then(m => m.AdminProductPageModule), canActivate: [UserGuard, AdminGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'admin-order', loadChildren: () => import('./pages/admin-order/admin-order.module').then(m => m.AdminOrderPageModule), canActivate: [UserGuard, AdminGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule), canActivate: [UserGuard] },
  { path: 'order/:id', loadChildren: () => import('./pages/order/order.module').then(m => m.OrderPageModule), canActivate: [UserGuard] },
  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'admin_order_detail/:id', loadChildren: () => import('./pages/admin-order-detail/admin-order-detail.module').then(m => m.AdminOrderDetailPageModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'all-products', loadChildren: () => import('./pages/all-products/all-products.module').then(m => m.AllProductsPageModule) },
  { path: 'order-history', loadChildren: () => import('./pages/order-history/order-history.module').then(m => m.OrderHistoryPageModule) },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
