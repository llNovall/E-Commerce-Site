import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSideviewComponent } from './cart-sideview.component';

describe('CartSideviewComponent', () => {
  let component: CartSideviewComponent;
  let fixture: ComponentFixture<CartSideviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartSideviewComponent]
    });
    fixture = TestBed.createComponent(CartSideviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
