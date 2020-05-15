import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthService {
  constructor(private http: HttpClient) {}

  public login({ username, password }: { username: string; password: string }) {
    console.log(username, password);
  }
}
