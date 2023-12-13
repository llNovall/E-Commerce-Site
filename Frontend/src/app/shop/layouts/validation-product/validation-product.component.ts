import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart.service';
import { ValidationCartProduct } from '../../models/validation-cart-product';

@Component({
  selector: 'shop-layouts-validation-product',
  templateUrl: './validation-product.component.html',
  styleUrls: ['./validation-product.component.scss'],
})
export class ValidationProductComponent implements OnInit {
  totalPrice: number = 0;
  //@Input({ required: true }) cartProduct: CartProduct | undefined;
  @Input({required: true}) validationCartProduct : ValidationCartProduct | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.calculatePrice();
  }
  onPressAdd(): void {
    if (this.validationCartProduct)
      this.cartService.addProduct(this.validationCartProduct.product, 1);

    this.calculatePrice();
  }

  onPressRemove(): void {
    if (this.validationCartProduct)
      this.cartService.removeProduct(this.validationCartProduct.product, 1);
    this.calculatePrice();
  }

  onPressRemoveCompletely(): void {
    if (this.validationCartProduct)
      this.cartService.removeProductCompletely(this.validationCartProduct.product);
  }

  calculatePrice(): void {
    this.totalPrice = 0;

    if (this.validationCartProduct) {
      this.totalPrice +=
        this.validationCartProduct.product.price * this.validationCartProduct.cartProduct.quantity;
    }
  }

  isValidationSuccessful():boolean{

    if (this.validationCartProduct)
      return this.validationCartProduct.product.quantity >= this.validationCartProduct.cartProduct.quantity;

    return false;
  }
}
