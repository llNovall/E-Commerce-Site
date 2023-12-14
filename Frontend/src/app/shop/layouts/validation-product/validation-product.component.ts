import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart.service';
import { ValidationCartProduct } from '../../models/validation-cart-product';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'shop-layouts-validation-product',
  templateUrl: './validation-product.component.html',
  styleUrls: ['./validation-product.component.scss'],
})
export class ValidationProductComponent implements OnInit {
  totalPrice: number = 0;
  validationCartProduct: ValidationCartProduct | null = null;

  @Input({ required: true }) cartProduct: CartProduct | null = null; // A product in the cart
  @Input({ required: true }) runValidation$: Observable<boolean> =
    new Observable<boolean>(); //Runs product validation based on the value received

  @Output() isValidationSuccessfulEmit: EventEmitter<ValidationCartProduct> =
    new EventEmitter<ValidationCartProduct>(); // Outputs boolean value based on validation success

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.runValidation$.subscribe({
      next: async (value) => {
        if (value) {
          await this.updateProductValidation();
          this.calculatePrice();
        }
      },
      error() {},
    });
  }

  async updateProductValidation(): Promise<void> {
    if (this.cartProduct) {
      let result = await lastValueFrom(
        this.cartService.validateProduct(this.cartProduct)
      );
      this.validationCartProduct = result;
      this.isValidationSuccessfulEmit.emit(this.validationCartProduct);
    }
  }
  onPressAdd(): void {
    if (this.validationCartProduct)
      this.cartService.addProduct(this.validationCartProduct.product, 1);

    this.updateProductValidation();
    this.calculatePrice();
  }

  onPressRemove(): void {
    if (this.validationCartProduct)
      this.cartService.removeProduct(this.validationCartProduct.product, 1);
    this.updateProductValidation();
    this.calculatePrice();
  }

  onPressRemoveCompletely(): void {
    if (this.validationCartProduct)
      this.cartService.removeProductCompletely(
        this.validationCartProduct.product
      );
  }

  calculatePrice(): void {
    this.totalPrice = 0;

    if (this.validationCartProduct) {
      this.totalPrice +=
        this.validationCartProduct.product.price *
        this.validationCartProduct.cartProduct.quantity;
    }
  }

  isValidationSuccessful(): boolean {
    if (this.validationCartProduct)
      return (
        this.validationCartProduct.product.quantity >=
        this.validationCartProduct.cartProduct.quantity
      );

    return false;
  }
}
