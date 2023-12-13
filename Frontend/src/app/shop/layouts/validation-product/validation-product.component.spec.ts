import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationProductComponent } from './validation-product.component';

describe('ValidationProductComponent', () => {
  let component: ValidationProductComponent;
  let fixture: ComponentFixture<ValidationProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationProductComponent]
    });
    fixture = TestBed.createComponent(ValidationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
