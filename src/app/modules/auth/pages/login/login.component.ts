import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor() {}

  ngOnInit(): void {}

  onUsernameChange(value: string) {
    this.username = value;
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  onSubmitClick() {
    console.log({
      username: this.username,
      password: this.password,
    });
    // TODO: call api
  }
}
