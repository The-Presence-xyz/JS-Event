import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
	@Input() type = 'text';
	@Input() buttonType = 'primary';
	@Output() customClick = new EventEmitter<MouseEvent>();

	constructor() { }

	ngOnInit(): void {
	}

	onClickButton(event) {
		this.customClick.emit(event);
	}

}
