import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CurrencyService, Currency } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" *ngIf="!isAdminRoute">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">AKLinks</a>
          
          <nav class="nav">
            <ul class="nav-links">
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li><a routerLink="/publisher-rates" routerLinkActive="active">Publisher Rates</a></li>
              <li><a routerLink="/payment-proof" routerLinkActive="active">Payment Proof</a></li>
              <li><a routerLink="/blog" routerLinkActive="active">Blog</a></li>
              
              <li class="dropdown">
                <button class="dropdown-toggle">
                  Important Pages
                  <span>▼</span>
                </button>
                <div class="dropdown-menu">
                  <a routerLink="/payment-system">Payment System</a>
                  <a routerLink="/payment-rules">Payment Rules</a>
                </div>
              </li>
            </ul>
            
            <div class="header-actions">
              <div class="currency-selector-wrapper">
                <button class="currency-toggle" (click)="toggleCurrencyDropdown()">
                  <span class="currency-icon">💱</span>
                  <span class="currency-text">{{ currentCurrency }}</span>
                  <span class="currency-arrow">▼</span>
                </button>
                <div class="currency-dropdown" [class.active]="isCurrencyDropdownOpen">
                  <button 
                    class="currency-option" 
                    [class.active]="currentCurrency === 'USD'"
                    (click)="selectCurrency('USD')">
                    <span class="currency-symbol">$</span>
                    <span class="currency-label">USD</span>
                  </button>
                  <button 
                    class="currency-option" 
                    [class.active]="currentCurrency === 'INR'"
                    (click)="selectCurrency('INR')">
                    <span class="currency-symbol">₹</span>
                    <span class="currency-label">INR</span>
                  </button>
                </div>
              </div>
              
              <div class="auth-buttons">
                <a routerLink="/auth/login" class="btn-login">
                  <span class="btn-icon">🔑</span>
                  Login
                </a>
                <a routerLink="/auth/signup" class="btn-signup">
                  <span class="btn-icon">👤</span>
                  Sign Up
                </a>
              </div>
            </div>
            
            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </nav>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" [class.active]="isMobileMenuOpen" (click)="closeMobileMenu()">
        <div class="mobile-menu" (click)="$event.stopPropagation()">
          <ul class="mobile-nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">Home</a></li>
            <li><a routerLink="/publisher-rates" routerLinkActive="active" (click)="closeMobileMenu()">Publisher Rates</a></li>
            <li><a routerLink="/payment-proof" routerLinkActive="active" (click)="closeMobileMenu()">Payment Proof</a></li>
            <li><a routerLink="/blog" routerLinkActive="active" (click)="closeMobileMenu()">Blog</a></li>
            <li class="mobile-dropdown">
              <button class="mobile-dropdown-toggle" (click)="toggleMobileDropdown()">
                Important Pages
                <span [class.rotated]="isMobileDropdownOpen">▼</span>
              </button>
              <div class="mobile-dropdown-menu" [class.active]="isMobileDropdownOpen">
                <a routerLink="/payment-system" (click)="closeMobileMenu()">Payment System</a>
                <a routerLink="/payment-rules" (click)="closeMobileMenu()">Payment Rules</a>
              </div>
            </li>
          </ul>
          
          <div class="mobile-auth-buttons">
            <div class="mobile-currency-selector">
              <button class="currency-toggle" (click)="toggleMobileCurrencyDropdown()">
                <span class="currency-icon">💱</span>
                <span class="currency-text">{{ currentCurrency }}</span>
                <span class="currency-arrow" [class.rotated]="isMobileCurrencyDropdownOpen">▼</span>
              </button>
              <div class="mobile-currency-dropdown" [class.active]="isMobileCurrencyDropdownOpen">
                <button 
                  class="currency-option" 
                  [class.active]="currentCurrency === 'USD'"
                  (click)="selectCurrency('USD'); closeMobileMenu()">
                  <span class="currency-symbol">$</span>
                  <span class="currency-label">USD</span>
                </button>
                <button 
                  class="currency-option" 
                  [class.active]="currentCurrency === 'INR'"
                  (click)="selectCurrency('INR'); closeMobileMenu()">
                  <span class="currency-symbol">₹</span>
                  <span class="currency-label">INR</span>
                </button>
              </div>
            </div>
            <a routerLink="/auth/login" class="btn-login" (click)="closeMobileMenu()">
              <span class="btn-icon">🔑</span>
              Login
            </a>
            <a routerLink="/auth/signup" class="btn-signup" (click)="closeMobileMenu()">
              <span class="btn-icon">👤</span>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .nav-links a.active {
      color: #667eea;
      font-weight: 600;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 2rem;
    }
    
    .currency-selector-wrapper {
      position: relative;
    }
    
    .currency-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      color: #333;
      transition: all 0.3s ease;
    }
    
    .currency-toggle:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .currency-icon {
      font-size: 1rem;
    }
    
    .currency-text {
      font-size: 0.9rem;
    }
    
    .currency-arrow {
      font-size: 0.7rem;
      transition: transform 0.3s ease;
    }
    
    .currency-dropdown {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 0.5rem 0;
      min-width: 120px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .currency-dropdown.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .currency-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.75rem 1rem;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.3s ease;
      color: #333;
    }
    
    .currency-option:hover {
      background-color: #f8f9fa;
    }
    
    .currency-option.active {
      background-color: #e9ecef;
      color: #667eea;
      font-weight: 600;
    }
    
    .currency-symbol {
      font-weight: 600;
      font-size: 1rem;
    }
    
    .currency-label {
      font-size: 0.9rem;
    }
    
    .mobile-currency-selector {
      width: 100%;
      margin-bottom: 1rem;
    }
    
    .mobile-currency-dropdown {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .mobile-currency-dropdown.active {
      max-height: 200px;
    }
    
    .currency-arrow.rotated {
      transform: rotate(180deg);
    }
    
    @media (max-width: 768px) {
      .header-actions {
        margin-left: 0;
      }
      
      .currency-toggle {
        padding: 0.4rem 0.8rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isMobileDropdownOpen = false;
  isMobileCurrencyDropdownOpen = false;
  isCurrencyDropdownOpen = false;
  isAdminRoute = false;
  currentCurrency: Currency = 'USD';
  private currencySubscription?: Subscription;

  constructor(
    private router: Router,
    private currencyService: CurrencyService
  ) {
    // Listen to route changes to detect admin routes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAdminRoute = event.url.startsWith('/admin') || event.url.startsWith('/manage-user-admin');
      });
  }

  ngOnInit(): void {
    // Check initial route
    this.isAdminRoute = this.router.url.startsWith('/admin') || this.router.url.startsWith('/manage-user-admin');
    
    // Subscribe to currency changes
    this.currentCurrency = this.currencyService.getCurrentCurrency();
    this.currencySubscription = this.currencyService.currency$.subscribe(currency => {
      this.currentCurrency = currency;
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
  }

  toggleCurrencyDropdown(): void {
    this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
  }

  selectCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
    this.isCurrencyDropdownOpen = false;
  }

  toggleMobileCurrencyDropdown(): void {
    this.isMobileCurrencyDropdownOpen = !this.isMobileCurrencyDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isMobileDropdownOpen = false;
      this.isMobileCurrencyDropdownOpen = false;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileDropdownOpen = false;
    this.isMobileCurrencyDropdownOpen = false;
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Close currency dropdown if clicking outside
    if (!target.closest('.currency-selector-wrapper')) {
      this.isCurrencyDropdownOpen = false;
    }
  }
}

