import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
	return this.http.get<any>(`http://localhost:3000/api/v1/allProducts`, {
		withCredentials: true
	});
  }
}
