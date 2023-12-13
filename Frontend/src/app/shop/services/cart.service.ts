import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, take } from 'rxjs';
import { CartProduct } from '../models/cart-product';
import { Product } from '../models/product';
import { ShopService } from './shop.service';
import { ValidationCartProduct } from '../models/validation-cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartProduct[] = [];
  private cartProducts$ = new BehaviorSubject<CartProduct[]>(this.cartProducts);

  private cartTotalPrice: number = 59;
  private cartTotalPrice$ = new BehaviorSubject<number>(this.cartTotalPrice);

  constructor(private shopService: ShopService) {
    let cartStorage = sessionStorage.getItem('cart');
    if (cartStorage) {
      let cartProducts: CartProduct[] = JSON.parse(cartStorage);
      cartProducts.forEach((c) => {
        this.cartProducts.push(c);
      });
    }

    this.calculatePrice();
  }

  getProducts(): Observable<CartProduct[]> {
    return this.cartProducts$;
  }

  getTotalPrice(): Observable<number> {
    return this.cartTotalPrice$;
  }

  addProduct(product: Product, numToAdd: number): void {
    let cartProduct: CartProduct | undefined;
    cartProduct = this.cartProducts.find((c) => c.product.id === product.id);
    if (cartProduct) cartProduct.quantity += numToAdd;
    else {
      cartProduct = { product: product, quantity: numToAdd };
      this.cartProducts.push(cartProduct);
    }

    sessionStorage.setItem('cart', JSON.stringify(this.cartProducts));

    this.calculatePrice();
  }

  removeProduct(product: Product, numToRemove: number): void {
    let cartProduct: CartProduct | undefined;
    cartProduct = this.cartProducts.find((c) => c.product.id === product.id);
    if (cartProduct) {
      cartProduct.quantity -= numToRemove;
      if (cartProduct.quantity <= 0) {
        let index = this.cartProducts.indexOf(cartProduct);

        if (index >= 0) {
          this.cartProducts.splice(index, 1);
        }
      }

      sessionStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.calculatePrice();
    }
  }

  removeProductCompletely(product: Product): void {
    let cartProduct: CartProduct | undefined;
    cartProduct = this.cartProducts.find((c) => c.product.id === product.id);

    if (cartProduct) {
      let index = this.cartProducts.indexOf(cartProduct);

      if (index >= 0) {
        this.cartProducts.splice(index, 1);
      }

      sessionStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.calculatePrice();
    }
  }

  calculatePrice(): void {
    let price: number = 0;
    this.cartProducts.forEach(
      (cartProduct) =>
        (price += cartProduct.product.price * cartProduct.quantity)
    );

    this.cartTotalPrice = price;
    this.cartTotalPrice$.next(this.cartTotalPrice);
  }

  validateProduct(cartProduct: CartProduct): Observable<ValidationCartProduct> {
    return this.shopService.getProduct(cartProduct.product.id).pipe(
      map((product =>{
        let validateProduct : ValidationCartProduct = {product : product, isValidationSuccessful : product.quantity >= cartProduct.quantity, cartProduct : cartProduct};
        return validateProduct;
      })
    ));
  }
}
