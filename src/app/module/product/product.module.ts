import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [ProductListComponent,ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    GalleriaModule
  ]
})
export class ProductModule { }
