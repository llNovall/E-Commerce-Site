import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/pages/homepage/homepage.component';
import { AboutUsComponent } from './core/pages/about-us/about-us.component';
import { LocationComponent } from './core/pages/location/location.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'location', component: LocationComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
