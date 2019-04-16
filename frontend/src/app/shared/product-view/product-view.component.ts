import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../shared.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

	id: number;
	product: any;
	categories: any[];
	quantity = [];
	constructor(
		private route: ActivatedRoute,
		private sharedService: SharedService
	) {}

  ngOnInit() {
	this.id = +this.route.snapshot.paramMap.get('id');
	console.log(this.id);
	this.sharedService.getProduct(this.id).subscribe(res => {
		this.product = res.result;
		if (this.product) {
			for (let i = 1; i <= res.result.stock; ++i) {
				this.quantity.push(i);
			}
			console.log('this.quantity  :::::::::: ', this.quantity);
		}

	});
  }
}
