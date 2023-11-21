import { Component } from '@angular/core';

@Component({
  selector: 'core-layouts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  loggedUserName: string = 'TestUser';

  isLoginPageShowed: boolean = false;

  showLoginPage(value : boolean): void{
    this.isLoginPageShowed = value;
  }
}
