import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostProductComponent } from './post-product/post-product.component';

const routes: Routes = [
  {
	path: 'post-product',
	component: PostProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {}
