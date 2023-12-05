import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shop/models/product';
import { CartService } from 'src/app/shop/services/cart.service';
import { ShopService } from 'src/app/shop/services/shop.service';

@Component({
  selector: 'core-pages-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private cartService: CartService
  ) {
    this.product = {
      id: '',
      price: 0,
      quantity: 0,
      productDescription: '',
      productName: '',
      productType: '',
      productImgUrl: '',
    };
  }
  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.shopService.getProduct(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: () => {
          console.log('Failed to find product.');
        },
      });
    }
  }

  addToCart(){
    this.cartService.addProduct(this.product, 1);
  }
}
