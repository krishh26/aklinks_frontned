import { Component, OnInit, OnDestroy, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { CurrencyService, Currency } from '../../services/currency.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="admin-header">
      <div class="header-left">
        <button class="sidebar-toggle-header-btn" *ngIf="!isSidebarOpen" (click)="onSidebarToggle()" title="Open Sidebar">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <ng-content></ng-content>
      </div>
      
      <div class="header-right">
        <div class="currency-switcher-wrapper">
          <button class="header-icon currency-toggle" (click)="toggleCurrencyDropdown()">
            <span>{{ getCurrencyIcon() }}</span>
          </button>
          <div class="currency-dropdown" [class.active]="isCurrencyDropdownOpen">
            <button 
              class="currency-option" 
              [class.active]="currentCurrency === 'USD'"
              (click)="selectCurrency('USD')">
              <span class="currency-icon">$</span>
              <span class="currency-label">USD</span>
            </button>
            <button 
              class="currency-option" 
              [class.active]="currentCurrency === 'INR'"
              (click)="selectCurrency('INR')">
              <span class="currency-icon">₹</span>
              <span class="currency-label">INR</span>
            </button>
          </div>
        </div>
        <div class="theme-switcher-wrapper">
          <button class="header-icon theme-toggle" (click)="toggleThemeDropdown()">
            <span>{{ getThemeIcon() }}</span>
          </button>
          <div class="theme-dropdown" [class.active]="isThemeDropdownOpen">
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'light'"
              (click)="selectTheme('light')">
              <span class="theme-icon">☀️</span>
              <span class="theme-label">Light</span>
            </button>
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'dark'"
              (click)="selectTheme('dark')">
              <span class="theme-icon">🌙</span>
              <span class="theme-label">Dark</span>
            </button>
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'blue'"
              (click)="selectTheme('blue')">
              <span class="theme-icon">🌊</span>
              <span class="theme-label">Blue</span>
            </button>
          </div>
        </div>
        <!-- <button class="header-icon notifications">
          <span>🔔</span>
          <span class="notification-badge">3</span>
        </button> -->
        <div class="profile-wrapper">
          <button class="header-icon profile" (click)="toggleProfileDropdown()">
            <span>👤</span>
          </button>
          <div class="profile-dropdown" [class.active]="isProfileDropdownOpen">
            <button 
              class="profile-option" 
              (click)="navigateToProfile()">
              <span class="profile-icon">👤</span>
              <span class="profile-label">Profile</span>
            </button>
            <button 
              class="profile-option logout-option" 
              (click)="logout()">
              <span class="profile-icon">🚪</span>
              <span class="profile-label">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  @Input() isSidebarOpen: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  currentTheme: Theme = 'light';
  currentCurrency: Currency = 'USD';
  isThemeDropdownOpen = false;
  isCurrencyDropdownOpen = false;
  isProfileDropdownOpen = false;
  private themeSubscription?: Subscription;
  private currencySubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private currencyService: CurrencyService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    this.currentCurrency = this.currencyService.getCurrentCurrency();
    this.currencySubscription = this.currencyService.currency$.subscribe(currency => {
      this.currentCurrency = currency;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'blue':
        return '🌊';
      default:
        return '☀️';
    }
  }

  getCurrencyIcon(): string {
    return this.currentCurrency === 'USD' ? '$' : '₹';
  }

  toggleCurrencyDropdown(): void {
    this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
    // Close other dropdowns when opening currency dropdown
    if (this.isCurrencyDropdownOpen) {
      this.isThemeDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }

  selectCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
    this.isCurrencyDropdownOpen = false;
  }

  toggleThemeDropdown(): void {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
    // Close other dropdowns when opening theme dropdown
    if (this.isThemeDropdownOpen) {
      this.isCurrencyDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.isThemeDropdownOpen = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    // Close other dropdowns when opening profile dropdown
    if (this.isProfileDropdownOpen) {
      this.isThemeDropdownOpen = false;
      this.isCurrencyDropdownOpen = false;
    }
  }

  navigateToProfile(): void {
    this.isProfileDropdownOpen = false;
    this.router.navigate(['/admin/settings/profile']);
  }

  logout(): void {
    this.isProfileDropdownOpen = false;
    this.localStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Close dropdowns if clicking outside
    if (!target.closest('.currency-switcher-wrapper') && 
        !target.closest('.theme-switcher-wrapper') && 
        !target.closest('.profile-wrapper')) {
      this.isCurrencyDropdownOpen = false;
      this.isThemeDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }
}
