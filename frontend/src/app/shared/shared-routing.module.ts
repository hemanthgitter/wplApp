import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
	{
		path: 'all',
		component: ProductListComponent
	},
	{
		path: 'product/:id',
		component: ProductViewComponent
	},
	{
		path: 'shoppingCart',
		component: ShoppingCartComponent
	},
	{
		path: 'orderList',
		component: OrdersListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SharedRoutingModule { }
