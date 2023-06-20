import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:'',
  },
  {
    component: SellerAuthComponent,
    path:'seller-auth',
  },
  {
    component:LoginComponent,
    path:'login',
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate:[AuthGuard]
  },
  {
    component:AddProductComponent,
    path:'add-product',
    canActivate:[AuthGuard]
  },
  { component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuard]

  },
  {
    component:SearchComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component:CartPageComponent,
    path:'cartPage'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    component:PaymentComponent,
    path:'payment'
  },
  {
    component:MyOrdersComponent,
    path:'my-order'
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
