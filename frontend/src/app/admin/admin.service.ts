import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	constructor(private http: HttpClient) { }

	getUsers() {
		console.log('getUsers ... ');
		return this.http.get<any[]>(`http://localhost:3000/api/v1/users`, { withCredentials: true });
	}
}
