import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(user: UserLogin): Observable<any> {
    return this.http.post<any>('http://localhost:5070/api/User/login', user);
  }
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }
}
