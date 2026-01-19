import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer" *ngIf="!isAdminRoute">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>About AKLinks</h4>
            <p>AKLinks is a free service providing an easy way to earn money by sharing shortened links with your followers. With our simple platform, you can quickly monetize your content and make money online.</p>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/publisher-rates">Publisher Rates</a></li>
              <li><a routerLink="/payment-proof">Payment Proof</a></li>
              <li><a routerLink="/blog">Blog</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Important Pages</h4>
            <ul class="footer-links">
              <li><a routerLink="/payment-system">Payment System</a></li>
              <li><a routerLink="/payment-rules">Payment Rules</a></li>
              <li><a routerLink="/about-us">About Us</a></li>
              <li><a routerLink="/contact-us">Contact Us</a></li>
              <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Get Started</h4>
            <ul class="footer-links">
              <li><a routerLink="/auth/login">Login</a></li>
              <li><a routerLink="/auth/signup">Sign Up</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 Copyrights by AKLinks All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #333;
      color: white;
      padding: 3rem 0 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      margin-bottom: 1rem;
      color: #667eea;
      font-size: 1.25rem;
    }

    .footer-section p {
      color: #ccc;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 0.95rem;
    }

    .footer-links a:hover {
      color: #667eea;
    }

    .footer-bottom {
      border-top: 1px solid #555;
      padding-top: 1rem;
      text-align: center;
      color: #ccc;
    }

    .footer-bottom p {
      margin: 0;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .footer-section {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent implements OnInit, OnDestroy {
  isAdminRoute = false;
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check initial route
    this.isAdminRoute = this.router.url.startsWith('/admin') || this.router.url.startsWith('/manage-user-admin');
    
    // Listen to route changes to detect admin routes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute = event.url.startsWith('/admin') || event.url.startsWith('/manage-user-admin');
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
