import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart-product';
import { BehaviorSubject, Observable, forkJoin, lastValueFrom } from 'rxjs';
import { ValidationCartProduct } from '../../models/validation-cart-product';

@Component({
  selector: 'shop-layouts-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent {
  cartProducts: CartProduct[] = []; // Contains all products currently in the cart
  cartTotalPrice: number = 0; // Total price of all the products in the cart
  isValidating: boolean = false; // Changes the state if validation is running
  isValidationSuccessful: boolean = false; // Changes the state if validation is successful or not
  productValidations: ValidationCartProduct[] = []; // Contains all validations for products in the cart
  runValidation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  ); //Changing this value to true will run validation on all the products

  @Input({ required: true }) runCartValidation$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false); //Based on the value received, will run validation on all the products in the cart
  @Output() validationEmit: EventEmitter<boolean> = new EventEmitter(); // Outputs the current validation state of the cart

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((products) => {
      this.cartProducts = products;
    });

    this.cartService.getTotalPrice().subscribe((totalPrice) => {
      this.cartTotalPrice = totalPrice;
    });

    this.runCartValidation$.subscribe(async (value) => {
      if (value == true) await this.validateCart();
    });
  }

  async validateCart(): Promise<void> {
    this.isValidating = true;
    this.isValidationSuccessful = false;
    this.productValidations = [];
    this.runValidation$.next(true);
  }

  addProductValidation(validation: ValidationCartProduct): void {
    let foundValidation: ValidationCartProduct | undefined =
      this.productValidations.find(
        (c) => c.cartProduct.product.id === validation.cartProduct.product.id
      );

    if (foundValidation) {
      foundValidation.isValidationSuccessful =
        validation.isValidationSuccessful;
    } else this.productValidations.push(validation);

    this.updateValidationStatus();
  }

  updateValidationStatus() {
    this.isValidationSuccessful =
      this.productValidations.filter((c) => c.isValidationSuccessful == false)
        .length == 0;
    this.validationEmit.emit(this.isValidationSuccessful);

    if (this.productValidations.length == this.cartProducts.length)
      this.isValidating = false;
  }
}
