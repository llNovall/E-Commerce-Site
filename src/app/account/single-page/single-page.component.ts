import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAuthenticationState } from '../models/user-authentication-state';

@Component({
  selector: 'account-all-purpose-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent {

  @Input ({required : true}) showPage : boolean = false;
  @Output() onCloseEmit : EventEmitter<void> = new EventEmitter();

  currentState : UserAuthenticationState = UserAuthenticationState.login;

  constructor(){
    console.log(this.currentState);
  }

  changeAccountState(state : UserAuthenticationState) {
    this.currentState = state;
  }

  onClickClose(){
    this.showPage = false;
    this.onCloseEmit.emit();
  }
}
