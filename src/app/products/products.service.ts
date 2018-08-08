import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({providedIn: 'root'})
export class ProductsService {
   private products: Product[] = [];
   private productsUpdated = new Subject<Product[]>();

   getProducts() {
     return [...this.products];
   }

   getProductUpdateListener() {
     return this.productsUpdated.asObservable();
   }

   addProduct(title: string, price: number, description: string) {
      const product: Product = {
        title: title,
        price: price,
        description: description
      };
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
   }
}
