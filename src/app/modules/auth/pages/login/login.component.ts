import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onUsernameChange(value: string) {
    this.username = value;
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  onSubmitClick() {
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .pipe(
        map(() => {
          this.activatedRoute.queryParamMap
            .pipe(
              map((queryParamMap) => {
                console.log(queryParamMap);

                const redirectUrl = queryParamMap.get('redirectUrl');
                if (redirectUrl) {
                  this.router.navigate([redirectUrl]);
                } else {
                  this.router.navigate(['']);
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
