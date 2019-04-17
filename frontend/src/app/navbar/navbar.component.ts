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

	currentUser: User;
	menuItems: any = [];

	constructor(
		private auth: AuthService,
		private router: Router,
		private menuService: MenuService
	) { }

	ngOnInit() {
		this.auth.currentUser.subscribe(val => {
			this.currentUser = val;
			if (this.currentUser) {
				this.menuService.fetchMenuItems().subscribe(
					data => {
						this.menuItems = data.menu;
					}
				);
			}
		});

	}

	logout() {
		this.auth.logout();
		localStorage.removeItem('shoppingCart');
		this.router.navigate(['/login']);
	}

}
