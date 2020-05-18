import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * post
   */
  public post<T>(url: string, body: any) {
    return this.http.post<T>(url, body);
  }
}
