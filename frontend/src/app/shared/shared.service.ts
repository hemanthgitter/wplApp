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

	getAllProducts(id, seller_id, limit, offset) {
		return this.http.post<any>(`http://localhost:3000/api/v1/allProducts`, {
			id, seller_id, limit, offset
		}, {withCredentials: true});
	}

	getProduct(id: number) {
		return this.http.get<any>(`http://localhost:3000/api/v1/product/${id}`, {
			withCredentials: true
		});
	}

	purchaseProducts(user_id: number, payment_type: string, totalamount: number, order_items: any[]) {
		return this.http.post<any>(`http://localhost:3000/api/v1/purchase`, {
			user_id, payment_type, totalamount, order_items
		}, {
			withCredentials: true
		});
	}

	getOrderList(user_id: number) {
		return this.http.get<any>(`http://localhost:3000/api/v1/order-list/${user_id}`, {
			withCredentials: true
		});
	}
}
