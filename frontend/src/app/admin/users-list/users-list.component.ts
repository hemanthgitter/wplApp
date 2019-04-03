import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface UserData {
	email: string;
	firstName: string;
	lastName: string;
}

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

	displayedColumns: string[] = ['email', 'firstName', 'lastName'];
	dataSource: MatTableDataSource<UserData>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private adminService: AdminService) { }

	users: [];

	ngOnInit() {
		console.log('Inside users list');
		this.adminService.getUsers().subscribe((res) => {
			this.users = res['result'];
			console.log('this.users :::::::: ', this.users);
			this.dataSource = new MatTableDataSource(this.users);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
