import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-f-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() id = 'input-field';
  @Input() label = '';
  @Input() value = '';
  @Input() type = 'text';
  @Input() error: string;
  @Output() textChange: (value: string) => {};

  constructor() {}

  ngOnInit(): void {}

  onTextChange(value: string) {
    this.textChange(value);
  }
}
