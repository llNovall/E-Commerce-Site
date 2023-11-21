import { Output, EventEmitter } from "@angular/core";
import { UserAuthenticationState } from "./models/user-authentication-state";
import { Directive } from '@angular/core';

@Directive()
export abstract class AbstractAuthStateComponent {
  @Output() authStateEmit: EventEmitter<UserAuthenticationState> =
    new EventEmitter();

  onAuthStateChanged(state: string) {
    let authState: UserAuthenticationState;

    switch (state) {
      case "login":
        authState = UserAuthenticationState.login;
        break;
      case "passwordReset":
        authState = UserAuthenticationState.passwordReset;
        break;
      case "signup":
        authState = UserAuthenticationState.signup;
        break;

      default:
        throw new Error("Invalid state: " + state);
    }

    this.authStateEmit.emit(authState);
    console.log(authState);
  }
}
