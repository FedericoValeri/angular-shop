import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthUserGuard } from './auth/auth-user.guard';
import { AuthAdminGuard } from './auth/auth-admin.guard';



const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductCreateComponent, canActivate: [AuthUserGuard]},
  { path: 'edit/:productId', component: ProductCreateComponent, canActivate: [AuthUserGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthUserGuard, AuthAdminGuard]
})
export class AppRoutingModule {}
