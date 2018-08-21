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
    const privilege = this.authService.userKind();
    console.log('Loggato come utente: ' + authAsUser);
    console.log('Privilege: ' + privilege);
    if (privilege === 'user' || !authAsUser) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
