import { Component} from '@angular/core';
import { LoginModel } from '../models/login-model';
import { NgForm } from '@angular/forms';
import { AbstractAuthStateComponent } from '../abstract-authstate-component';

@Component({
  selector: 'account-layouts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractAuthStateComponent {

  loginModel: LoginModel = { userName: '', password: '' };

  onSubmit(form: NgForm): void {
    console.log('Login form submitted');
  }

}
