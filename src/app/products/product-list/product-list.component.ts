import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
 products: Product[] = [];
 isLoading = false;
 private productsSub: Subscription;


  constructor(public productsService: ProductsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts();
    this.productsSub = this.productsService
    .getProductUpdateListener()
    .subscribe((products: Product[]) => {
      this.isLoading = false;
       this.products = products;
    });
  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
