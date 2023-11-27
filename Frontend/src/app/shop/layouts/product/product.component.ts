import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'shop-layouts-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
@Input({required : true}) product: Product

  constructor(){
    this.product = {
      price : 0.00,
      productDescription: '',
      productName: '',
      productType: '',
      quantity : 1,
      productImgUrl: ''
    }
  }
}
