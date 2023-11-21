import { NgModule } from '@angular/core';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { LocationComponent } from './core/pages/location/location.component';

@NgModule({
  declarations: [HomepageComponent, HeaderComponent, FooterComponent, AboutUsComponent, LocationComponent],
  imports: [RouterModule, CommonModule, AccountModule],
  exports: [HomepageComponent, HeaderComponent, FooterComponent],
})
export class CoreModule {}
