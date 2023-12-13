import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from '../../models/cart-product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shop-layouts-cart-sideview',
  templateUrl: './cart-sideview.component.html',
  styleUrls: ['./cart-sideview.component.scss'],
})
export class CartSideviewComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  cartTotalPrice: number = 0;
  isLoggedIn: boolean = true;

  @Input() isSideViewCardDisplayed: boolean = false;
  @Output() isSideViewCardDisplayedEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((products) => {
      this.cartProducts = products;
    });

    this.cartService.getTotalPrice().subscribe((totalPrice) => {
      this.cartTotalPrice = totalPrice;
    });
  }
  toggleDisplay(): void {
    this.isSideViewCardDisplayed = !this.isSideViewCardDisplayed;
  }

  onClickClose(): void {
    this.isSideViewCardDisplayed = false;
    this.isSideViewCardDisplayedEmit.emit(this.isSideViewCardDisplayed);
  }
}
