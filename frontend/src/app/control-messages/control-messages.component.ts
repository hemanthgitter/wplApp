import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ValidationService } from '../validation.service';

@Component({
	selector: 'app-control-messages',
	templateUrl: './control-messages.component.html',
	styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
	@Input() control: FormControl;

	constructor() { }

	ngOnInit() { }

	get errorMessage() {
		for (const propertyName in this.control.errors) {
			if (
				this.control.errors.hasOwnProperty(propertyName) &&
				this.control.touched
			) {
				console.log(this.control.errors);
				return ValidationService.getValidatorErrorMessage(
					propertyName,
					this.control.errors[propertyName]
				);
			}
		}
		return null;
	}
}
