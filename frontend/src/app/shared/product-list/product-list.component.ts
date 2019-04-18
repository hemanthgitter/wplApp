import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SellerService } from '../../seller/seller.service';
import { AuthService } from '../../auth/auth.service';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	// MatPaginator Inputs
	length = 0;
	pageSize = 2;
	pageSizeOptions: number[] = [2, 5, 10, 25, 100];
	pageIndex = 0;

	searchValue = '';
	searchText = new FormControl('');

	categoriesForm: FormGroup;
	categories: any[];
	loading = false;
	id = null;
	noProducts = false;
	role = '';
	seller_id = null;

	constructor(
		private sharedService: SharedService,
		private fb: FormBuilder,
		private sellerService: SellerService,
		private auth: AuthService
	) { }
	products: [];

	ngOnInit() {
		this.searchTextChanges();
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
		if (this.role === 'seller') {
			this.seller_id = this.auth.currentUserValue.id;
		}
		const limit = this.pageSize;
		const offset = this.pageIndex * limit;
		this.getProducts(this.id, this.seller_id, limit, offset, this.searchValue);
	}

	searchTextChanges() {
		this.searchText.valueChanges
		.pipe(debounceTime(500))
		.subscribe(val => {
			console.log('Search text : ', val);
			this.searchValue = val;
			const limit = this.pageSize;
			const offset = this.pageIndex * limit;
			this.getProducts(this.categoriesForm.value.selectedCategories, this.seller_id, limit, offset, this.searchValue);
		});
	}

	pageEvent(event) {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		const limit = this.pageSize;
		const offset = this.pageIndex * limit;
		console.log('event :: ', event);
		this.getProducts(this.id, this.seller_id, limit, offset, this.searchValue);
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
		const limit = this.pageSize;
		const offset = this.pageIndex * limit;
		this.getProducts(this.categoriesForm.value.selectedCategories, seller_id, limit, offset, this.searchValue);
		console.log('selectedCategoriesArray :: ', this.categoriesForm.value.selectedCategories);

	}

	getProducts(selectedCategories, seller_id, limit, offset, searchValue) {
		this.sharedService.getAllProducts(selectedCategories, seller_id, limit, offset, searchValue).subscribe(res => {
			this.length = res.result.count;
			this.products = res.result.rows;
			if (res.result.length === 0) {
				this.noProducts = true;
			} else {
				this.noProducts = false;
			}
		});
	}
}
