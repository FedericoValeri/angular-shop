import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  enteredTitle = '';
  enteredDescription = '';
  product: Product;
  private mode = 'create';
  private productId: string;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.productsService.getProduct(this.productId)
        .subscribe(productData => {
          this.product = {
            id: productData._id,
            title: productData.title,
            price: productData.price,
            description: productData.description
          };
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  onSaveProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.productsService.addProduct(
        form.value.title,
        form.value.price,
        form.value.description
      );
    } else {
      this.productsService.updateProduct(
        this.productId,
        form.value.title,
        form.value.price,
        form.value.description
      );
    }
    form.resetForm();
  }
}
