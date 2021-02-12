import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { CareersComponent } from './core/careers/careers.component';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { MyBiographyComponent } from './core/my-biography/my-biography.component';
import { PrivacyComponent } from './core/privacy/privacy.component';
import { TermsComponent } from './core/terms/terms.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { CartComponent } from './shop/cart/cart.component';
import { WishlistComponent } from './shop/wishlist/wishlist.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'contact-us',
    component:ContactUsComponent
  },
  {
    path:'careers',
    component:CareersComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  {
    path:'privacy-policies',
    component:PrivacyComponent
  },
  {
    path:'terms&conditions',
    component:TermsComponent
  },
  {
    path:'history',
    component:MyBiographyComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  },
  {
    path:'product',
    loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule)
  },
  {
    path:'user',
    loadChildren: () => import('./module/user/user.module').then(m => m.UserModule),
    canActivate:[AuthGuard]
  },

  {
    path:'category',
    loadChildren: () => import('./module/category/category.module').then(m => m.CategoryModule)
  },

  {
    path:'seller',
    loadChildren: () => import('./module/seller/seller.module').then(m => m.SellerModule)
  },

  {
    path:'**',
    redirectTo : '/404'
  },
  {
    path:'404',
    component:PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
