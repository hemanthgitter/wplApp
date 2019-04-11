import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { PostProductComponent } from './post-product/post-product.component';
import { ListProductsComponent } from './list-products/list-products.component';

@NgModule({
  declarations: [PostProductComponent, ListProductsComponent],
  imports: [
	CommonModule,
	SellerRoutingModule
  ]
})
export class SellerModule { }
