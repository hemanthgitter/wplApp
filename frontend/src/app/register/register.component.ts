import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

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
	confirmPassword: ['', [Validators.required, ValidationService.passwordValidator]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
