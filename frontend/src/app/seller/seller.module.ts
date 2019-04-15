import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { PostProductComponent } from './post-product/post-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostProductComponent, ListProductsComponent],
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, SellerRoutingModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, SharedModule, MatSelectModule]
})
export class SellerModule {}
