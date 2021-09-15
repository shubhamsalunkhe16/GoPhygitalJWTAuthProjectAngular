import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public generateToken(userLogin: any) {
    return this.http.post(`${baseURL}/generate-token`, userLogin);
  }

  public setToken(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isloggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public isLanguageEN() {
    let user = this.getUser();
    let userLaguage = user.language;
    if (userLaguage == 'EN') {
      return true;
    } else if (userLaguage == 'DN') {
      return false;
    } else {
      console.log('Error invalid language');
      return "";
    }
  }

  public getCurrentUser() {
    return this.http.get(`${baseURL}/current-user`);
  }
}
