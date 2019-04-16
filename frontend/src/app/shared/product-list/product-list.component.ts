import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(
	private sharedService: SharedService
  ) {}
  products: [];

  ngOnInit() {
	this.sharedService.getAllProducts().subscribe(res => {
		this.products = res.result;
	});
  }
}
