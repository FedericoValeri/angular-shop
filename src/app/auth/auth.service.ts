import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private privilege: string;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private authAsAdminStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  userKind() {
    return this.privilege;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

 getAuthAsAdminStatusListener() {
    return this.authAsAdminStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http
      .post<{ token: string, expiresIn: number, privilege: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);
        const privilege = response.privilege;
        this.privilege = privilege;
        const token = response.token;
        this.token = token;

        if (token && privilege === 'user') {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, privilege);
          this.router.navigate(['/']);
          console.log('Primo if - dopo il login, privilege è: ' + this.privilege);
        }

        if (token && privilege === 'admin') {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.authAsAdminStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, privilege);
          this.router.navigate(['/']);
          console.log('Secondo if - Dopo il login, privilege è: ' + this.privilege);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    const privilege = authInformation.privilege;
    if (expiresIn > 0) {
      if (privilege === 'user') {
        this.token = authInformation.token;
        this.privilege = authInformation.privilege;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
        console.log('Privilege: ' + authInformation.privilege);
      }
      if (privilege === 'admin') {
        this.token = authInformation.token;
        this.privilege = authInformation.privilege;
        this.isAuthenticated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
        this.authAsAdminStatusListener.next(true);
        console.log('Privilege: ' + authInformation.privilege);
      }
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

private setAuthTimer(duration: number) {
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}

private saveAuthData(token: string, expirationDate: Date, privilege: string) {
   localStorage.setItem('token', token);
   localStorage.setItem('expiration', expirationDate.toISOString());
   localStorage.setItem('privilege', privilege);
 }

 private clearAuthData() {
   localStorage.removeItem('token');
   localStorage.removeItem('expiration');
   localStorage.removeItem('privilege');
 }

 private getAuthData() {
   const token = localStorage.getItem('token');
   const expirationDate = localStorage.getItem('expiration');
   const privilege = localStorage.getItem( 'privilege');
   if (!token && !expirationDate && !privilege) {
     return;
   }
   return {
     token: token,
     expirationDate: new Date(expirationDate),
     privilege: privilege
   };
 }

}

