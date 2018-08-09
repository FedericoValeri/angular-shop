import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Product } from './product.model';

@Injectable({providedIn: 'root'})
export class ProductsService {
   private products: Product[] = [];
   private productsUpdated = new Subject<Product[]>();

   constructor(private http: HttpClient) {}

   getProducts() {
     this.http.get<{message: string, products: Product[]}>('http://localhost:3000/api/products')
     .subscribe((productData) => {
        this.products = productData.products;
        this.productsUpdated.next([...this.products]);
     });
   }

   getProductUpdateListener() {
     return this.productsUpdated.asObservable();
   }

   addProduct(title: string, price: number, description: string) {
      const product: Product = {
        id: null,
        title: title,
        price: price,
        description: description
      };
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
   }
}
