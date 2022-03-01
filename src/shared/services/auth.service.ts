import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UsersRequest } from 'src/models/request_models/user-request';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  JWT_TOKEN = "IMS_JWT_TOKEN";
  APP_USER = "IMS_ALBIORIX_USER";
  token!: string;
  localStorageBehaviour = new BehaviorSubject(null);
  
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }


  signOut() {
    this.storageService.clear();
    this.router.navigate(["/login"]);
  }

  setUserAndToken(token: string, user: UsersRequest) {
    this.token = token;
    this.storageService.setItem(this.JWT_TOKEN, token);
    this.storageService.setItem(this.APP_USER, user);
  }

  getUserRole() {
    const user = this.storageService.getItem(this.APP_USER);
    if (user) {
      return user.role.toLowerCase();
    }
  }

  getUserFullName() {
    const res = this.storageService.getItem(this.APP_USER);
    let fullName = "";
    if (res) {
      fullName = res.firstName + " " + res.lastName;
    }
    return fullName;
  }

  getJwtToken() {
    return this.storageService.getItem(this.JWT_TOKEN);
  }

  getUser() {
    return this.storageService.getItem(this.APP_USER);
  }
}
