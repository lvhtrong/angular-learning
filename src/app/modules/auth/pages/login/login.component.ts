import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@core/services/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  usernameError = null;

  password = '';
  passwordError = null;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  onUsernameChange(value: string) {
    this.username = value;
    this.usernameError = null;
  }

  onPasswordChange(value: string) {
    this.password = value;
    this.passwordError = null;
  }

  onSubmitClick() {
    if (!this.username || !this.password) {
      if (!this.username) {
        this.usernameError = 'User Name is required';
      }
      if (!this.password) {
        this.passwordError = 'Password is required';
      }
      return;
    }

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
        }),
        catchError((err) => {
          this.modalService.openNotifyModal({
            content: 'Incorrect email or password',
          });

          const { error } = err;
          return throwError(error.message);
        })
      )
      .subscribe();
  }
}
