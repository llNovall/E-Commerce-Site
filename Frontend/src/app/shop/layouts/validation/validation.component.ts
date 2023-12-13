import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/cart-product';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';
import { ValidationCartProduct } from '../../models/validation-cart-product';

@Component({
  selector: 'shop-layouts-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent {
  cartProducts: CartProduct[] = [];
  cartTotalPrice: number = 0;
  isValidating: boolean = false;
  isValidationSuccessful: boolean = false;
  productValidations : ValidationCartProduct[] = [];

  @Output() validationEmit: EventEmitter<boolean> = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((products) => {
      this.cartProducts = products;
      this.validateCart();
    });

    this.cartService.getTotalPrice().subscribe((totalPrice) => {
      this.cartTotalPrice = totalPrice;
    });
  }

  async validateCart(): Promise<void> {
    this.isValidating = true;

    let failedValidationCount: number = 0;
    this.productValidations = [];
    
    for(const p of this.cartProducts){
      let result = await lastValueFrom(this.cartService.validateProduct(p));

      this.productValidations.push(result);
      if(result)
        result.isValidationSuccessful? failedValidationCount += 0 : failedValidationCount +=1;
    }

    this.isValidationSuccessful = failedValidationCount == 0;

    this.validationEmit.emit(this.isValidationSuccessful);
    this.isValidating = false;
  }

}
