import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './layouts/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports:[
    ProductComponent
  ]
})
export class ShopModule { }
