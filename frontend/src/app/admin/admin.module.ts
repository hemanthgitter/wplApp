import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import {MatTableModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
	CommonModule,
  AdminRoutingModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule
  ]
})
export class AdminModule { }
