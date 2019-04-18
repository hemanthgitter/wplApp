import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SellerService } from '../../seller/seller.service';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	categoriesForm: FormGroup;
	categories: any[];
	loading = false;
	id = null;
	noProducts = false;
	role = '';

	constructor(
		private sharedService: SharedService,
		private fb: FormBuilder,
		private sellerService: SellerService,
		private auth: AuthService
	) { }
	products: [];

	ngOnInit() {
		this.categoriesForm = this.fb.group({
			selectedCategories: this.fb.array([])
		});
		this.sellerService.fetchCategories().subscribe(
			data => {
				this.categories = data.result;
			}
		);
		const currentUser = this.auth.currentUserValue;
		for (let i = 0; i < currentUser['roles'].length; ++i) {
			if (currentUser['roles'][i] === 'seller' ) {
				this.role = 'seller';
			}
		}
		let seller_id = null;
		if (this.role === 'seller') {
			seller_id = this.auth.currentUserValue.id;
		}
		this.sharedService.getAllProducts(this.id, seller_id).subscribe(res => {
			this.products = res.result;
			if (res.result.length === 0) {
				this.noProducts = true;
			} else {
				this.noProducts = false;
			}
		});
	}

	onChange(email: string, isChecked: boolean) {
		const selectedCategoriesArray = <FormArray>this.categoriesForm.controls.selectedCategories;

		if (isChecked) {
			selectedCategoriesArray.push(new FormControl(email));
		} else {
			const index = selectedCategoriesArray.controls.findIndex(x => x.value === email);
			selectedCategoriesArray.removeAt(index);
		}
		let seller_id = null;
		if (this.role === 'seller') {
			seller_id = this.auth.currentUserValue.id;
		}
		this.sharedService.getAllProducts(this.categoriesForm.value.selectedCategories, seller_id).subscribe(res => {
			this.products = res.result;
			if (res.result.length === 0) {
				this.noProducts = true;
			} else {
				this.noProducts = false;
			}
		});

		console.log('selectedCategoriesArray :: ', this.categoriesForm.value.selectedCategories);

	}
}
