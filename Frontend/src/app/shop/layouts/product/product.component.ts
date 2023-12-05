import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shop-layouts-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
@Input({required : true}) product: Product

  constructor(private cartService: CartService){
    this.product = {
      id : '',
      price : 0.00,
      productDescription: '',
      productName: '',
      productType: '',
      quantity : 1,
      productImgUrl: ''
    }
  }

  addToCart(){
    this.cartService.addProduct(this.product, 1);
  }
}
