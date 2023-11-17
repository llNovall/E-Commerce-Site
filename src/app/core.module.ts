import { NgModule } from '@angular/core';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomepageComponent, HeaderComponent],
  imports: [RouterModule],
  exports: [HomepageComponent],
})
export class CoreModule {}
