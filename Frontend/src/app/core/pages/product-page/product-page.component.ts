import { Component } from '@angular/core';
import { Product } from 'src/app/shop/models/product';

@Component({
  selector: 'core-pages-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  product : Product;

  constructor(){
    this.product = {price: 0, quantity: 0, productDescription : "", productName : "", productType : ""}
  }

  
}
