import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

	constructor(
		private sharedService: SharedService,
		private fb: FormBuilder
	) { }

	Arr = Array;
	totalItems = 0;
	totalCost = 0.00;
	products = [];

	selectedQuantityForm = this.fb.group({
		quantity: ['', [Validators.required]]
	});

	ngOnInit() {
		this.totalItems = 0;
		this.totalCost = 0.00;
		let shoppingCart = this.sharedService.shoppingCart.value;
		if (!shoppingCart || shoppingCart.length === 0) {
			if (localStorage.getItem('shoppingCart')) {
				shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			}
		}
		this.products = shoppingCart;
		shoppingCart.forEach(item => {
			this.totalItems += item.quantitySelected;
			this.totalCost += +item.price * item.quantitySelected;
		});
	}

	deleteProduct(id) {
		console.log('Delete product : ', id);
		const updatedProducts = this.products.filter((el) => {
			return el.id !== id;
		});
		this.products = updatedProducts;
		this.sharedService.shoppingCart.next(updatedProducts);
		localStorage.setItem('shoppingCart', JSON.stringify(updatedProducts));
		console.log('updatedProducts :: ', updatedProducts);
	}

	selectedQuantityChanged(id, event) {
		console.log('selectedQuantityChanged: ' + id, event.value);
		for (let i = 0; i < this.products.length; ++i) {
			if (this.products[i].id === id) {
				this.products[i].quantitySelected = event.value;
				break;
			}
		}
		this.sharedService.shoppingCart.next(this.products);
		localStorage.setItem('shoppingCart', JSON.stringify(this.products));
	}

}
