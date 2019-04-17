import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private auth: AuthService,
		private router: Router
	) {}

	canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		console.log('Inside canActivate');
		const currentUser = this.auth.currentUserValue;
		const expectedRole = next.data.expectedRole;
		if (currentUser) {
			console.log('currentUser:::: ', currentUser);
			for (let i = 0; currentUser['roles'].length; ++i) {
				if (currentUser['roles'][i] === expectedRole[0] ||  expectedRole.length === 0 ) {return true; }
			}
		}
		// not logged in so redirect to login page with the return url
		this.logout();
		return false;
	}

	logout() {
		console.log('Inside logout');
		this.auth.logout();
		localStorage.removeItem('shoppingCart');
		this.router.navigate(['/login']);
	}
}
