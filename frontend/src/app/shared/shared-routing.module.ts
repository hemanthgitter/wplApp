import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
	{
		path: 'all',
		component: ProductListComponent
	},
	{
		path: 'product/:id',
		component: ProductViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SharedRoutingModule { }
