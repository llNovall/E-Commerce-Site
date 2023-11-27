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
  sortBy: string = "lprice";

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
        console.log(error);
      },
    });
  }

  onFilterChanged(filterOption : FilterCheckbox, isChecked : boolean): void {
    filterOption.isChecked = isChecked;
    this.updateFilteredProducts();
  }

  onSortChanged(value : string){
    this.sortBy = value;
    this.updateFilteredProducts();
  }

  updateFilteredProducts() : void{
    let checkedTypes : string[] = this.filterCheckboxes.filter(c=> c.isChecked === true).map(c=> c.optionName);

    if(checkedTypes.length > 0)
      this.filteredProducts = this.products.filter(c=> checkedTypes.includes(c.productType));

    if(this.sortBy === 'lprice')
      this.filteredProducts = this.products.sort((a ,b) =>  (a.price < b.price ? -1 : 1));
    else if(this.sortBy === 'hprice')
      this.filteredProducts = this.products.sort((a ,b) =>  (a.price > b.price ? -1 : 1));
  }
}
