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
           id: product._id,
           imagePath: product.imagePath
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
     return this.http.get<{_id: string, title: string, price: string, description: string, imagePath: string}>(
       'http://localhost:3000/api/products/' + id
      );
  }

  addProduct(title: string, price: string, description: string, image: File) {
    const productData = new FormData();
    productData.append('title', title);
    productData.append('price', price);
    productData.append('description', description);
    productData.append('image', image, title);
    this.http
      .post<{ message: string, product: Product }>('http://localhost:3000/api/products', productData)
      .subscribe(responseData => {
        const product: Product = {
          id: responseData.product.id,
          title: title,
          price: price,
          description: description,
          imagePath: responseData.product.imagePath
        };
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }

  updateProduct(id: string, title: string, price: string, description: string, image: File | string) {
    let productData: Product | FormData;
    if (typeof(image) === 'object') {
      productData = new FormData();
      productData.append('id', id);
      productData.append('title', title);
      productData.append('price', price);
      productData.append('description', description);
      productData.append('image', image, title);
    } else {
      productData = {
         id: id,
         title: title,
         price: price,
         description: description,
         imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/products/' + id, productData)
    .subscribe(response => {
      const updatedProducts = [...this.products];
      const oldProductIndex = updatedProducts.findIndex(p => p.id === id);
      const product: Product = {
        id: id,
        title: title,
        price: price,
        description: description,
        imagePath: ''
      };
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
