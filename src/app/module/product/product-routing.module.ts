import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path:'',
    component:ProductListComponent
  },
  {
    path:'list',
    component:ProductListComponent
  },
  {
    path:'list/:keyword',
    component:ProductListComponent
  },
  {
    path:'details/:id',
    component:ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
