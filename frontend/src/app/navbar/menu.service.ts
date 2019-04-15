import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
	private http: HttpClient
  ) { }

  fetchMenuItems() {
	return this.http.post<any>(`http://localhost:3000/api/v1/menu`, {}, {withCredentials: true})
	.pipe(map(res => res));
  }
}
