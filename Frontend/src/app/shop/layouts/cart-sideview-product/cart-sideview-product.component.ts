import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shop-layouts-cart-sideview-product',
  templateUrl: './cart-sideview-product.component.html',
  styleUrls: ['./cart-sideview-product.component.scss'],
})
export class CartSideviewProductComponent {
  @Input({ required: true }) cartProduct: CartProduct | undefined;

  constructor(private cartService: CartService){}
  onPressAdd(): void {
    if (this.cartProduct)
      this.cartService.addProduct(this.cartProduct.product, 1);
  }

  onPressRemove(): void {
    if (this.cartProduct)
      this.cartService.removeProduct(this.cartProduct.product, 1);
  }
}
