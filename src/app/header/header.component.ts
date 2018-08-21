import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  privilege: string;
  private privilegeListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log('isAuthenticated per header: ' + this.userIsAuthenticated);
    });
    this.privilege = this.authService.userKind();
    this.privilegeListenerSubs = this.authService
    .getAuthAsAdminStatusListener()
    .subscribe(isAdmin => {
        this.privilege = isAdmin;
      console.log('Privilege per header: ' + this.privilege);
    });

  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.privilegeListenerSubs.unsubscribe();
  }

}
