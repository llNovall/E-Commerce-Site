import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { LocationComponent } from './core/pages/location/location.component';
import { ShopPageComponent } from './core/pages/shop-page/shop-page.component';
import { ProductPageComponent } from './core/pages/product-page/product-page.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'location', component: LocationComponent},
  {path: 'shop', component: ShopPageComponent},
  {path: 'shop/:filter', component: ShopPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
