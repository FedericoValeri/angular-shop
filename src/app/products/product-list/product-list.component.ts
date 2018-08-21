import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
 products: Product[] = [];
 isLoading = false;
 userIsAuthenticated = false;
 privilege: string;
 private productsSub: Subscription;
 private authStatusSub: Subscription;
 private privilegeStatusSub: Subscription;


  constructor(public productsService: ProductsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts();
    this.productsSub = this.productsService
    .getProductUpdateListener()
    .subscribe((products: Product[]) => {
      this.isLoading = false;
       this.products = products;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log('isAuthenticated per product list: ' + this.userIsAuthenticated);

    });

    this.privilege = this.authService.userKind();
    this.privilegeStatusSub = this.authService
    .getAuthAsAdminStatusListener()
    .subscribe(isAdmin => {
     this.privilege = isAdmin;
      console.log('Privilege per product list: ' + this.privilege);
    });

  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.privilegeStatusSub.unsubscribe();
  }

}
