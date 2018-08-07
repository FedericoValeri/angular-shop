import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @Output() productCreated = new EventEmitter<Product>();

  onAddProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const product: Product = {
      title: form.value.title,
      price: form.value.price,
      description: form.value.description
    };
    this.productCreated.emit(product);
  }
}
