import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidationService {
	static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
		const config = {
			required: 'Required',
			invalidCreditCard: 'Is invalid credit card number',
			invalidEmailAddress: 'Invalid email address',
			invalidPassword:
				'Invalid password. Password must be at least 6 characters long, and contain a number.',
			minlength: `Minimum length ${validatorValue.requiredLength}`
		};
		console.log('validatorValue: ', validatorValue);
		return config[validatorName];
	}

	static emailValidator(control) {
		// RFC 2822 compliant regex
		if (
			control.value.match(
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
			)
		) {
			return null;
		} else {
			return { invalidEmailAddress: true };
		}
	}

	static passwordValidator(control) {
		if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
			return null;
		} else {
			return { 'invalidPassword': true };
		}
	}

	constructor() { }
}
