import { Component } from '@angular/core';
import { AbstractAuthStateComponent } from '../abstract-authstate-component';
import { PasswordResetModel } from '../models/password-reset-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'account-layouts-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends AbstractAuthStateComponent {
  resetPasswordModel : PasswordResetModel = {username: ""}

  onSubmit(form: NgForm): void {
    console.log('Password reset form submitted');
  }
}
