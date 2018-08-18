import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  enteredTitle = '';
  enteredDescription = '';
  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: any;
  private mode = 'create';
  private productId: string;

  constructor(
    public productsService: ProductsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId)
        .subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            imagePath: productData.imagePath
          };
          this.form.setValue({
            title: this.product.title,
            price: this.product.price,
            description: this.product.description,
            image: this.product.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.productsService.addProduct(
        this.form.value.title,
        this.form.value.price,
        this.form.value.description,
        this.form.value.image
      );
    } else {
      this.productsService.updateProduct(
        this.productId,
        this.form.value.title,
        this.form.value.price,
        this.form.value.description,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
