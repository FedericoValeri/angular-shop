import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(map((productData) => {
       return productData.products.map(product => {
         return {
           title: product.title,
           price: product.price,
           description: product.description,
           id: product._id
         };
       });
      }))
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
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
    this.http
      .post<{ message: string }>('http://localhost:3000/api/products', product)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }
}
