import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ValidationService } from '../../validation.service';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-post-product',
	templateUrl: './post-product.component.html',
	styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private sellerService: SellerService,
		private router: Router,
	) { }

	public image: File = null;
	imgURL: any;
	public message: string;
	price: any;
	categories: any[];

	postProductForm = this.fb.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
		stock: ['', [Validators.required]],
		price: ['', [Validators.required]],
		category: [this.categories, [Validators.required]]
	  });

	ngOnInit() {
		this.sellerService.fetchCategories().subscribe(
			data => {
				this.categories = data.result;
				console.log('Categories:::: ', this.categories);
			}
		);
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

	productSubmit() {
		console.log('Category selected:::::::: ', this.postProductForm.controls.category.value);
		this.sellerService.saveProduct(
			this.postProductForm.controls.title.value,
			this.postProductForm.controls.description.value,
			this.postProductForm.controls.stock.value,
			this.postProductForm.controls.price.value,
			this.image.name,
			this.imgURL,
			this.postProductForm.controls.category.value
		)
			.subscribe(
				data => {
					console.log(data);
				},
				error => {
					console.log('Error - Unable to save the product');
				});
	}
}
