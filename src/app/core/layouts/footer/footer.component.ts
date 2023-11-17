import { Component } from '@angular/core';

@Component({
  selector: 'core-layouts-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  copyrightDate: Date;

  constructor() {
    this.copyrightDate = new Date();
  }
}
