import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductCreateComponent},
  { path: 'edit/:productId', component: ProductCreateComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
