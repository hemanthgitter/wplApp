import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	private homeRoute = '';
	private loginRoute = '/login';
	private registerRoute = '/register';
	private logoutRoute = '/logout';
	private getAllUsersforAdmin = '/users/users-list';

	currentUser: User;
	admin = false;

	constructor(
		private auth: AuthService,
		private router: Router,
		private menuService: MenuService
	) { }

	ngOnInit() {
		this.auth.currentUser.subscribe(val => {
			this.currentUser = val;
			this.admin = false;
			if (this.currentUser) {
				this.currentUser['roles'].forEach(role => {
					if (role === 'admin') {
						this.admin = true;
					}
				});
			}
		});

	}

	logout() {
		this.auth.logout();
		this.router.navigate(['/login']);
	}

}
