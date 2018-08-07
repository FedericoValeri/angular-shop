import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 /*  products = [
    { title: 'First Product', price: '100€', description: 'First product description!'},
    { title: 'Second Product', price: '80€', description: 'Second product description!'}
  ];
 */

 @Input() products: Product[] = [];

  constructor() { }

  ngOnInit() {
  }

}
