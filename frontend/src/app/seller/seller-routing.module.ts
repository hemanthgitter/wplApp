import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostProductComponent } from './post-product/post-product.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes: Routes = [
  {
	path: 'post-product',
	component: PostProductComponent
  },
  {
	  path: 'list-products',
	  component: ListProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
