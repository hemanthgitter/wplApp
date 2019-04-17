import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class SharedService {
	public shoppingCart: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
	currentShoppingCart = this.shoppingCart.asObservable();

	constructor(private http: HttpClient) { }

	updateShoppingCart(data) {
		this.shoppingCart.next(data);
	}

	getAllProducts(id) {
		return this.http.post<any>(`http://localhost:3000/api/v1/allProducts`, {
			id
		}, {withCredentials: true});
	}

	getProduct(id: number) {
		return this.http.get<any>(`http://localhost:3000/api/v1/product/${id}`, {
			withCredentials: true
		});
	}
}
