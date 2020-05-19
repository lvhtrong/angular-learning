import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RequestOptions } from './models/request-options';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * get
   */
  public get<T>(url: string, options?: RequestOptions) {
    return this.http.get<T>(url, options);
  }

  /**
   * post
   */
  public post<T>(url: string, body: any, options?: RequestOptions) {
    return this.http.post<T>(url, body, options);
  }
}
