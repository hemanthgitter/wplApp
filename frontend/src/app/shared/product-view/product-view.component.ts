import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../shared.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SellerService } from '../../seller/seller.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-view',
	templateUrl: './product-view.component.html',
	styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

	id: number;
	product: any;
	categories = [];
	quantityDropDown = [];
	quantitySelected: number;
	role: string;
	editProduct = false;
	public image: File = null;
	imgURL: any;
	public message: string;
	price: any;

	selectedQuantityForm = this.fb.group({
		quantity: ['', [Validators.required]]
	});

	postProductForm = this.fb.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
		stock: ['', [Validators.required]],
		price: ['', [Validators.required]],
		category: [this.categories, [Validators.required]]
	});

	constructor(
		private route: ActivatedRoute,
		private sharedService: SharedService,
		private fb: FormBuilder,
		private auth: AuthService,
		private sellerService: SellerService,
		private router: Router
	) { }

	ngOnInit() {
		const currentUser = this.auth.currentUserValue;
		if (currentUser) {
			for (let i = 0; currentUser['roles'].length; ++i) {
				if (currentUser['roles'][i] === 'seller') {
					this.role = 'seller';
					break;
				} else if (currentUser['roles'][i] === 'user') {
					this.role = 'user';
					break;
				} else if (currentUser['roles'][i] === 'admin') {
					this.role = 'admin';
					break;
				}
			}
		}

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

	preview(event) {
		const files = event.target.files;
		if (files.length === 0) {
			return;
		}

		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.message = 'Only images are supported.';
			return;
		}

		const reader = new FileReader();
		this.image = files[0];
		console.log('this.imagePath::::: ', this.image);
		reader.readAsDataURL(files[0]);
		reader.onload = _event => {
			this.imgURL = reader.result;
		};
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

	productSubmit() {
		console.log('Category selected:::::::: ', this.postProductForm.controls.category.value);
		this.sellerService.updateProduct(
			this.product.id,
			this.postProductForm.controls.title.value,
			this.postProductForm.controls.description.value,
			this.postProductForm.controls.stock.value,
			this.postProductForm.controls.price.value,
			this.image ? this.image.name : this.product.imageTitle,
			this.imgURL,
			this.postProductForm.controls.category.value
		)
			.subscribe(
				data => {
					console.log('Data :: ', data);

					this.product = data.result;
					this.editProduct = false;
				},
				error => {
					console.log('Error - Unable to save the product');
				});
	}

	editproduct() {
		this.editProduct = true;
		this.imgURL = this.product.image;
		this.sellerService.fetchCategories().subscribe(
			data => {
				this.categories = data.result;
				this.postProductForm.setValue({
					title: this.product.title,
					description: this.product.description,
					stock: this.product.stock,
					price: this.product.price,
					category: this.categories
				});
			}
		);
	}

	deleteproduct() {
		this.sellerService.deleteProduct(this.product.id).subscribe(
			data => {
				console.log(data);
				this.router.navigate(['products', 'all']);
			}
		);
	}

	cancelEdit() {
		this.editProduct = false;
		this.postProductForm.setValue({
			title: '',
			description: '',
			stock: '',
			price: '',
			category: ''
		});
	}
}
