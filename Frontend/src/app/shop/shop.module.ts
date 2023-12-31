import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './layouts/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartSideviewComponent } from './layouts/cart-sideview/cart-sideview.component';
import { CartSideviewProductComponent } from './layouts/cart-sideview-product/cart-sideview-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    CartSideviewComponent,
    CartSideviewProductComponent
  ],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports:[
    ProductComponent, CartSideviewComponent
  ]
})
export class ShopModule { }
