import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient, private _cookieService: CookieService) {
		this.currentUserSubject = new BehaviorSubject<User>(this.getCookie('payload'));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	getCookie(key: string) {
		if (this._cookieService.get(key)) {
			return JSON.parse(this._cookieService.get(key));
		}
		return null;
	}

	deleteCookie(key: string) {
		return this._cookieService.remove(key);
	}

	get isLoggedIn() {
		return false;
	}

	get isSuperAdmin() {
		return true;
	}

	login(email: string, password: string) {
		return this.http.post<any>(`http://localhost:3000/api/v1/login`, { email, password }, { withCredentials: true })
			.pipe(map(user => {
				// login successful if there's a jwt token in the response
				console.log(JSON.parse(this._cookieService.get('payload')));
				const payload = this.getCookie('payload');
				if (payload) {
					console.log('localStorage');
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					this.currentUserSubject.next(payload);
					// this.currentUserSubject.next(payload);
				}

				return payload;
			}));
	}

	register(firstName: string, lastName: string, email: string, password: String, roleId: Number) {
		// tslint:disable-next-line:max-line-length
		return this.http.post<any>(`http://localhost:3000/api/v1/register`, { firstName, lastName, email, password, roleId }, { withCredentials: true })
			.pipe(map(user => {
				return user;
			}));
	}

	logout() {
		this.deleteCookie('payload');
		this.currentUserSubject.next(null);
		localStorage.removeItem('shoppingCart');
		console.log(JSON.parse(localStorage.getItem('shoppingCart')));
	}

	getRoles() {
		return this.http.get<any>(`http://localhost:3000/api/v1/roles`, { withCredentials: true })
			.pipe(map(roles => {
				return roles;
			}));
	}
}
