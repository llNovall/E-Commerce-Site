import { Component } from '@angular/core';

@Component({
  selector: 'core-layouts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  loggedUserName: string = 'TestUser';
}
