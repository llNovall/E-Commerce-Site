import { NgModule } from '@angular/core';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { LocationComponent } from './core/pages/location/location.component';
import { ShopPageComponent } from './core/pages/shop-page/shop-page.component';
import { ShopModule } from './shop/shop.module';
import { ProductPageComponent } from './core/pages/product-page/product-page.component';

@NgModule({
  declarations: [HomepageComponent, HeaderComponent, FooterComponent, AboutUsComponent, LocationComponent, ShopPageComponent, ProductPageComponent],
  imports: [RouterModule, CommonModule, AccountModule, ShopModule],
  exports: [HomepageComponent, HeaderComponent, FooterComponent],
})
export class CoreModule {}
