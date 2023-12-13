import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shop-layouts-cart-sideview-product',
  templateUrl: './cart-sideview-product.component.html',
  styleUrls: ['./cart-sideview-product.component.scss'],
})
export class CartSideviewProductComponent implements OnInit {
  totalPrice: number = 0;

  @Input({ required: true }) cartProduct: CartProduct | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.calculatePrice();
  }

  onPressAdd(): void {
    if (this.cartProduct) {
      this.cartService.addProduct(this.cartProduct.product, 1);
      this.calculatePrice();
    }
  }

  onPressRemove(): void {
    if (this.cartProduct) {
      this.cartService.removeProduct(this.cartProduct.product, 1);
      this.calculatePrice();
    }
  }

  onPressRemoveCompletely(): void {
    if (this.cartProduct)
      this.cartService.removeProductCompletely(this.cartProduct.product);
  }

  calculatePrice(): void {
    this.totalPrice = 0;

    if (this.cartProduct) {
      this.totalPrice +=
        this.cartProduct.product.price * this.cartProduct.quantity;
    }
  }
}
