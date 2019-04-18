import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
	noProducts = false;
	orders = [];
	constructor(
		private sharedService: SharedService,
		private auth: AuthService
	) { }

	ngOnInit() {
		const user_id = this.auth.currentUserValue.id;
		this.sharedService.getOrderList(user_id).subscribe(data => {
			console.log('Order List :: ', data);
			if (data.length === 0) {
				this.noProducts = true;
			}
			this.orders = data;
		});
	}

	parseDateTime(date) {
		date = date.split('.')[0];
		date = date.split('T')[0] + ' ' + date.split('T')[1];
		const jsDate = new Date(Date.parse(date.replace(/[-]/g, '/')));
		return jsDate;
	}


}
