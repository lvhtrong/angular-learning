import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  removeToken = jest.fn();

  login = jest.fn();

  /**
   * logout
   */
  logout = jest.fn();

  /**
   * isAuthenticated
   */
  isAuthenticated = jest.fn();

  /**
   * getToken
   */
  getToken = jest.fn();
}
