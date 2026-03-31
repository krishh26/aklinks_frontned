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
    <button
      type="button"
      class="back-to-top-btn"
      (click)="scrollToTop()"
      aria-label="Back to top">
      ↑
    </button>
  `,
  styles: [`
    .back-to-top-btn {
      position: fixed;
      right: 20px;
      bottom: 24px;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.35);
      z-index: 10001;
      transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
      opacity: 0.95;
    }

    .back-to-top-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(102, 126, 234, 0.45);
      opacity: 1;
    }
  `]
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
        this.scrollToTopOnRouteChange();
      });
  }

  private updateLayoutVisibility(url: string): void {
    const isProtectedArea = url.startsWith('/admin') || url.startsWith('/manage-user-admin');
    const isAuthArea = url.startsWith('/auth');
    this.showPublicLayout = !isProtectedArea && !isAuthArea;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    document.querySelectorAll<HTMLElement>('.main-content, .page-content').forEach((el) => {
      el.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  private scrollToTopOnRouteChange(): void {
    // Wait for the next frame so the new route view is attached.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Some layouts use internal scroll containers instead of the window.
      document.querySelectorAll<HTMLElement>('.main-content, .page-content').forEach((el) => {
        el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        el.scrollTop = 0;
      });
    });
  }
}

