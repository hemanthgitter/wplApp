import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../shared.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-product-view',
	templateUrl: './product-view.component.html',
	styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

	id: number;
	product: any;
	categories: any[];
	quantityDropDown = [];
	quantitySelected: number;

	selectedQuantityForm = this.fb.group({
		quantity: ['', [Validators.required]]
	});

	constructor(
		private route: ActivatedRoute,
		private sharedService: SharedService,
		private fb: FormBuilder,
	) { }

	ngOnInit() {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.sharedService.getProduct(this.id).subscribe(res => {
			this.product = res.result;
			if (this.product) {
				for (let i = 1; i <= res.result.stock; ++i) {
					this.quantityDropDown.push(i);
				}
			}
		});
	}

	addtoCart() {
		let shoppingCart = this.sharedService.shoppingCart.value;
		if (!shoppingCart || shoppingCart.length === 0) {
			if (localStorage.getItem('shoppingCart')) {
				shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			}
		}
		this.product['quantitySelected'] = this.selectedQuantityForm.controls.quantity.value;
		let updatedShoppingCart;
		let i = 0;
		if (shoppingCart.length > 0) {
			for (i; i < shoppingCart.length; ++i) {
				if (shoppingCart[i].id === this.product.id) {
					shoppingCart[i] = this.product;
					updatedShoppingCart = shoppingCart;
					break;
				}
			}
			if (i === shoppingCart.length) {
				updatedShoppingCart = [...shoppingCart, this.product];
			}
		} else {
			updatedShoppingCart = [...shoppingCart, this.product];
		}
		this.sharedService.shoppingCart.next(updatedShoppingCart);
		localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart));
		console.log(JSON.parse(localStorage.getItem('shoppingCart')));
		console.log('updateShoppingCart :::: ', updatedShoppingCart);
		console.log('Quantity ::: ', this.selectedQuantityForm.controls.quantity.value);
	}
}
