import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

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

	constructor(private fb: FormBuilder) { }

	ngOnInit() { }

	loginSubmit = () => {
		console.log(this.loginForm.value);
	}
}
