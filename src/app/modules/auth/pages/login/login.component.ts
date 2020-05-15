import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onUsernameChange(value: string) {
    this.username = value;
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  onSubmitClick() {
    this.authService.login({
      username: this.username,
      password: this.password,
    });
  }
}
