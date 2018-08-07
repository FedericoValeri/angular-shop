import { Component, EventEmitter, Output } from '@angular/core';

import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  enteredTitle = '';
  enteredDescription = '';
  enteredPrice = null;
  @Output() productCreated = new EventEmitter();

  onAddProduct() {
    const product: Product = {
      title: this.enteredTitle,
      price: this.enteredPrice,
      description: this.enteredDescription
    };
    this.productCreated.emit(product);
  }
}
