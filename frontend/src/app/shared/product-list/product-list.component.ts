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
		this.sharedService.getAllProducts().subscribe(res => {
			this.products = res.result;
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
		console.log('selectedCategoriesArray :: ', this.categoriesForm.value);
	}
}
