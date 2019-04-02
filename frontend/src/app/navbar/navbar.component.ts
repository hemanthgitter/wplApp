import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

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

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		this.auth.currentUser.subscribe(val => this.currentUser = val);
	}

	logout() {
		this.auth.logout();
		this.router.navigate(['/login']);
	}

}