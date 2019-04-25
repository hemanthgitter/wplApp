import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import { ProductViewComponent } from './product-view/product-view.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

@NgModule({
	declarations: [ControlMessagesComponent, ProductListComponent, ProductViewComponent, ShoppingCartComponent, OrdersListComponent],
	// tslint:disable-next-line:max-line-length
	imports: [CommonModule, SharedRoutingModule, MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, MatSnackBarModule],
	exports: [ControlMessagesComponent]
})
export class SharedModule { }
