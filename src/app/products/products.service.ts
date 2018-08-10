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

  getProduct(id: string) {
     return this.http.get<{_id: string, title: string, price: number, description: string}>('http://localhost:3000/api/products/' + id);
  }

  addProduct(title: string, price: number, description: string) {
    const product: Product = {
      id: null,
      title: title,
      price: price,
      description: description
    };
    this.http
      .post<{ message: string, productId: string }>('http://localhost:3000/api/products', product)
      .subscribe(responseData => {
        const id = responseData.productId;
        product.id = id;
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }

  updateProduct(id: string, title: string, price: number, description: string) {
    const product: Product = { id: id, title: title, price: price, description: description };
    this.http.put('http://localhost:3000/api/products/' + id, product)
    .subscribe(response => {
      const updatedProducts = [...this.products];
      const oldProductIndex = updatedProducts.findIndex(p => p.id === product.id);
      updatedProducts[oldProductIndex] = product;
      this.products = updatedProducts;
      this.productsUpdated.next([...this.products]);
    });
  }

  deleteProduct(productId: string) {
    this.http.delete('http://localhost:3000/api/products/' + productId)
    .subscribe(() => {
      const updatedProducts = this.products.filter(product => product.id !== productId);
      this.products = updatedProducts;
      this.productsUpdated.next([...this.products]);
    });
  }


}
