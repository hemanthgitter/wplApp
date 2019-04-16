import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
	declarations: [ControlMessagesComponent, ProductListComponent, ProductViewComponent],
	// tslint:disable-next-line:max-line-length
	imports: [CommonModule, SharedRoutingModule, MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatProgressSpinnerModule],
	exports: [ControlMessagesComponent]
})
export class SharedModule { }
