import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/domains/auth/services/auth.service';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
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
        switchMap(() =>
          this.activatedRoute.queryParamMap.pipe(
            map((queryParamMap) => queryParamMap.get('redirectUrl')),
            map((redirectUrl: string) => {
              if (redirectUrl) {
                this.router.navigate([redirectUrl]);
              } else {
                this.router.navigate(['']);
              }
            })
          )
        ),
        catchError(() => {
          this.modalService.openNotifyModal({
            content: 'Incorrect email or password',
          });

          return of('Incorrect email or password');
        })
      )
      .subscribe();
  }
}
