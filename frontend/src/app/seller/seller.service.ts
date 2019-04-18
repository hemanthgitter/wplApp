import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SellerService {

	constructor(
		private http: HttpClient
	) { }

	// tslint:disable-next-line:max-line-length
	saveProduct(title: String, description: String, stock: Number, price: Number, imageTitle: String, image: File, category_id: Number, seller_id: Number) {
		// tslint:disable-next-line:max-line-length
		return this.http.post<any>(
			`http://localhost:3000/api/v1/saveProduct`,
			{ title, description, stock, price, imageTitle, image, category_id, seller_id },
			{
				withCredentials: true
			})
			.pipe(map(res => {
				return res;
			}));
	}

	// tslint:disable-next-line:max-line-length
	updateProduct(id: number, title: String, description: String, stock: Number, price: Number, imageTitle: String, image: File, category_id: Number) {
		// tslint:disable-next-line:max-line-length
		return this.http.post<any>(
			`http://localhost:3000/api/v1/updateProduct`,
			{ id, title, description, stock, price, imageTitle, image, category_id },
			{
				withCredentials: true
			})
			.pipe(map(res => {
				return res;
			}));
	}

	deleteProduct(id) {
		return this.http.delete(`http://localhost:3000/api/v1/product/${id}`, {
			withCredentials: true
		});
	}

	fetchCategories() {
		return this.http.get<any>(`http://localhost:3000/api/v1/categories`, { withCredentials: true });
	}
}
