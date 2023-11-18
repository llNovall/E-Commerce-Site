import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, SinglePageComponent],
  imports: [CommonModule, FormsModule],
  exports: [SinglePageComponent],
})
export class AccountModule {}
