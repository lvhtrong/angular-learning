import { Injectable } from '@angular/core';
import { environment } from '@env';
import UrlAssembler from 'url-assembler';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { RequestPayload } from './models/request-payload';
import { ResponsePayload } from './models/response-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthService {
  readonly TOKEN_KEY = 'token';

  constructor(private api: ApiService) {}

  public login(payload: RequestPayload) {
    return new Observable<string>((observer) => {
      const apiUrl = environment.apiUrl;
      const url = UrlAssembler(apiUrl).segment('/auth/login').toString();

      this.api
        .post<ResponsePayload>(url, {
          email: payload.username,
          password: payload.password,
        })
        .pipe(
          map((data) => {
            const token = data?.token?.accessToken;
            this.setToken(token);
            observer.next(token);
          }),
          catchError((err) => {
            const { error } = err;
            return throwError(error.message);
          })
        )
        .subscribe();
    });
  }

  /**
   * logout
   */
  public logout() {
    this.removeToken();
  }

  /**
   * setToken
   */
  private setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}