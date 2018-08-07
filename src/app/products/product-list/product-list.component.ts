import { Component, OnInit } from '@angular/core';

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

 products = [];

  constructor() { }

  ngOnInit() {
  }

}
