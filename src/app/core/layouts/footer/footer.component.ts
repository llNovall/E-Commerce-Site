import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'core-layouts-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  copyrightDate: Date;
  observer: ResizeObserver | undefined;
  isPositionFixed: boolean = false;
  routerNavigationEnd$: Subscription;

  constructor(private router: Router) {
    this.copyrightDate = new Date();
    this.routerNavigationEnd$ = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkPositionFixedStatus();
      });
  }

  ngOnInit(): void {
    this.observer = new ResizeObserver((e) => {
      this.checkPositionFixedStatus();
    });

    this.observer.observe(document.body);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.unobserve(document.body);
    if (this.routerNavigationEnd$) this.routerNavigationEnd$.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkPositionFixedStatus();
  }

  checkPositionFixedStatus(): void {
    this.isPositionFixed =
      document.body.scrollHeight + 54 < document.documentElement.clientHeight;
  }
}
