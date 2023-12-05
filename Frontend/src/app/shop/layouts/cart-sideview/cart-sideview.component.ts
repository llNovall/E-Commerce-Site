import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shop-layouts-cart-sideview',
  templateUrl: './cart-sideview.component.html',
  styleUrls: ['./cart-sideview.component.scss']
})
export class CartSideviewComponent {
  
  @Input() isSideViewCardDisplayed : boolean = true;
  @Output() isSideViewCardDisplayedEmit : EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleDisplay() : void{
    this.isSideViewCardDisplayed = !this.isSideViewCardDisplayed;
  }

  onClickClose(): void {
    this.isSideViewCardDisplayed = false;
    this.isSideViewCardDisplayedEmit.emit(this.isSideViewCardDisplayed);
  }
}
