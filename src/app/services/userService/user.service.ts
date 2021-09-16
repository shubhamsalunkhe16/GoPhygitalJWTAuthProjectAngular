import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public registerUser(user: any) {
    return this.http.post(`${baseURL}/user/`, user);
  }

  public getAllUsers() {
    return this.http.get(`${baseURL}/user/allUsers`);
  }

  public enableUser(user: any) {
    return this.http.put(`${baseURL}/user/enable-user/${user.username}`, user);
  }

  public disableUser(user: any) {
    return this.http.put(`${baseURL}/user/disable-user/${user.username}`, user);
  }
}
