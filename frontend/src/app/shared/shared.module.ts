import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedRoutingModule } from './shared-routing.module';
import { MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ControlMessagesComponent, ProductListComponent],
  imports: [CommonModule, SharedRoutingModule, MatCardModule, MatGridListModule, MatSidenavModule, MatButtonModule],
  exports: [ControlMessagesComponent]
})
export class SharedModule {}
