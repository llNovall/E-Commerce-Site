import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
