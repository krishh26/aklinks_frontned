import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header *ngIf="showPublicLayout"></app-header>
    <router-outlet></router-outlet>
    <app-footer *ngIf="showPublicLayout"></app-footer>
  `
})
export class AppComponent {
  title = 'aklinks-linkshort';
  showPublicLayout = true;

  constructor(private router: Router) {
    this.updateLayoutVisibility(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLayoutVisibility(event.urlAfterRedirects);
      });
  }

  private updateLayoutVisibility(url: string): void {
    const isProtectedArea = url.startsWith('/admin') || url.startsWith('/manage-user-admin');
    const isAuthArea = url.startsWith('/auth');
    this.showPublicLayout = !isProtectedArea && !isAuthArea;
  }
}

