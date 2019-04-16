import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = this.fb.group({
	firstName: ['', [Validators.required]],
	lastName: ['', [Validators.required]],
	email: ['', [Validators.required, ValidationService.emailValidator]],
	password: ['', [Validators.required, ValidationService.passwordValidator]],
	confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]]
  });
  message = '';
  messageColor = '';

  constructor(
	  private fb: FormBuilder,
	  private router: Router,
	  private auth: AuthService
	) {}

  ngOnInit() {}

  registerSubmit() {
	console.log(this.registerForm.value);
	this.auth.register(
			this.registerForm.controls.firstName.value,
			this.registerForm.controls.lastName.value,
			this.registerForm.controls.email.value,
			this.registerForm.controls.password.value,
			2
		)
		.subscribe(
			data => {
				console.log('Sucessful login');
				if (data.message) {
					this.message = data.message;
					this.messageColor = 'success';
				}
				this.router.navigate(['/login']);
			},
			error => {
				this.message = error.error.message;
				this.messageColor = 'warn';
				console.log('Error - while trying to register');
			});
  }
}
