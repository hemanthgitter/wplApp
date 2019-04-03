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
		return this.http.post<any>(`http://localhost:3000/api/v1/login`, { email, password }, {withCredentials: true})
			.pipe(map(user => {
				// login successful if there's a jwt token in the response
				console.log(JSON.parse(this._cookieService.get('payload')));
				const payload = this.getCookie('payload');
				// console.log('payload:: ', payload['user']);
				if (payload) {
					console.log('localStorage');
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					this.currentUserSubject.next(payload);
					// this.currentUserSubject.next(payload);
				}

				return payload;
			}));
	}

	logout() {
		this.deleteCookie('payload');
		this.currentUserSubject.next(null);
	}
}
