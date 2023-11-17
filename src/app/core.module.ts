import { NgModule } from '@angular/core';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomepageComponent, HeaderComponent, FooterComponent],
  imports: [RouterModule, CommonModule],
  exports: [HomepageComponent],
})
export class CoreModule {}
