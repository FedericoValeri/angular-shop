import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const authAsUser = this.authService.getIsAuth();
    const authAsAdmin = this.authService.userIsAdmin();
    console.log(authAsUser);
    if (authAsUser) {
      this.router.navigate(['/']);
    }
    if (!authAsAdmin && !authAsUser) {
      console.log('I am here!');
      this.router.navigate(['/login']);
    }
    return authAsAdmin;
  }
}
