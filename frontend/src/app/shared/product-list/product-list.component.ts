import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SellerService } from '../../seller/seller.service';

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

	constructor(
		private sharedService: SharedService,
		private fb: FormBuilder,
		private sellerService: SellerService
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

		this.sharedService.getAllProducts(this.id).subscribe(res => {
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
		this.sharedService.getAllProducts(this.categoriesForm.value.selectedCategories).subscribe(res => {
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
