import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { AuthService } from '../auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	hide = true;

	loginForm = this.fb.group({
		email: ['', [Validators.required, ValidationService.emailValidator]],
		password: ['', [Validators.required, Validators.minLength(6), ValidationService.passwordValidator]]
	});

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private auth: AuthService
	) { }

	ngOnInit() { }

	loginSubmit = () => {
		console.log(this.loginForm.value);
		this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
			.pipe(first())
			.subscribe(
				data => {
					console.log('Sucessful login');
					this.router.navigate(['/']);
				},
				error => {
					console.log('Error - while trying to login');
				});
	}
}
