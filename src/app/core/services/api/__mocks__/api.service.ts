import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  /**
   * get
   */
  get = jest.fn();

  /**
   * post
   */
  post = jest.fn();
}
