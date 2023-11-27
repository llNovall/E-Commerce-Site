import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FilterCheckbox } from 'src/app/shop/models/filter';
import { Product } from 'src/app/shop/models/product';
import { ShopService } from 'src/app/shop/services/shop.service';

@Component({
  selector: 'core-pages-shop',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  products: Product[] = [];
  filterCheckboxes: FilterCheckbox[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  sortBy: string = 'lprice';
  paginationNumCurrent: number = 1;
  paginationOptions: number[] = [];
  displayNumProductsPerPage: number = 1;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        products
          .map((c) => c.productType)
          .filter((value, index, self) => self.indexOf(value) === index)
          .forEach((c) =>
            this.filterCheckboxes.push({ optionName: c, isChecked: false })
          );

        this.updateFilteredProducts();
      },
      error: (error) => {
        console.log("Failed to connect to API");
      },
    });
  }

  onPaginationChanged(page: number): void {
    this.paginationNumCurrent = page;
    this.updateFilteredProducts();
  }
  onFilterChanged(filterOption: FilterCheckbox, isChecked: boolean): void {
    filterOption.isChecked = isChecked;
    this.updateFilteredProducts();
  }

  onSortChanged(value: string) {
    this.sortBy = value;
    this.updateFilteredProducts();
  }

  updateFilteredProducts(): void {
    let checkedTypes: string[] = this.filterCheckboxes
      .filter((c) => c.isChecked == true)
      .map((c) => c.optionName);

    if (checkedTypes.length > 0)
      this.filteredProducts = this.products.filter((c) =>
        checkedTypes.includes(c.productType)
      );
    else this.filteredProducts = this.products;

    if (this.sortBy === 'lprice')
      this.filteredProducts = this.filteredProducts.sort((a, b) =>
        a.price < b.price ? -1 : 1
      );
    else if (this.sortBy === 'hprice')
      this.filteredProducts = this.filteredProducts.sort((a, b) =>
        a.price > b.price ? -1 : 1
      );

    this.displayNumProductsPerPage = 10;

    let p: number = Math.round(
      this.filteredProducts.length / this.displayNumProductsPerPage
    );
    this.paginationOptions = Array(Math.floor(p))
      .fill(0)
      .map((x, i) => i + 1);

    let paginationStart =
      (this.paginationNumCurrent - 1) * this.displayNumProductsPerPage;
    paginationStart < 0
      ? (paginationStart = 0)
      : (paginationStart = paginationStart);
    let paginationEnd = paginationStart + this.displayNumProductsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(
      paginationStart,
      paginationEnd
    );
  }
}
