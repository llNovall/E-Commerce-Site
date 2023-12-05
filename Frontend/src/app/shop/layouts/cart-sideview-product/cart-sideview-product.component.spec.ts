import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSideviewProductComponent } from './cart-sideview-product.component';

describe('CartSideviewProductComponent', () => {
  let component: CartSideviewProductComponent;
  let fixture: ComponentFixture<CartSideviewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartSideviewProductComponent]
    });
    fixture = TestBed.createComponent(CartSideviewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
