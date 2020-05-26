import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-f-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() id = 'input-field';
  @Input() testId = 'input-field-testid';
  @Input() label = '';
  @Input() value = '';
  @Input() type = 'text';
  @Input() error: string;
  @Output() textChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onTextChange(value: string) {
    this.textChange.emit(value);
  }
}
