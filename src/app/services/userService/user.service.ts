import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from '../helper/helper';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public registerUser(user: any) {
    return this.http.post(`${baseURL}/user/`, user);
  }

  public getAllUsers() {
    return this.http.get(`${baseURL}/user/allUsers`);
  }
}
