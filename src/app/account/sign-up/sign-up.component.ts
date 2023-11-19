import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpModel } from '../models/sign-up-model';
import { AbstractAuthStateComponent } from '../abstract-authstate-component';

@Component({
  selector: 'account-layout-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends AbstractAuthStateComponent{

  signupModel: SignUpModel = {userName : '', email : '', password : ''};

  onSubmit(form: NgForm): void {
    console.log('Signup form submitted');
  }

}
