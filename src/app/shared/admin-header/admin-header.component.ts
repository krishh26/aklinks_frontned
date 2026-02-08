import { Component, OnInit, OnDestroy, HostListener, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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
      <div class="admin-header-inner">
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
          <button #currencyBtn class="header-icon currency-toggle" (click)="toggleCurrencyDropdown()">
            <span>{{ getCurrencyIcon() }}</span>
          </button>
          <div class="currency-dropdown" [class.active]="isCurrencyDropdownOpen" [style.top.px]="currencyDropdownTop" [style.right.px]="currencyDropdownRight">
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
          <button #themeBtn class="header-icon theme-toggle" (click)="toggleThemeDropdown()">
            <span>{{ getThemeIcon() }}</span>
          </button>
          <div class="theme-dropdown" [class.active]="isThemeDropdownOpen" [style.top.px]="themeDropdownTop" [style.right.px]="themeDropdownRight">
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
          <button #profileBtn class="header-icon profile" (click)="toggleProfileDropdown()">
            <span>👤</span>
          </button>
          <div class="profile-dropdown" [class.active]="isProfileDropdownOpen" [style.top.px]="profileDropdownTop" [style.right.px]="profileDropdownRight">
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
      </div>
    </header>
  `,
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  @Input() isSidebarOpen: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  @ViewChild('currencyBtn') currencyBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('themeBtn') themeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('profileBtn') profileBtn!: ElementRef<HTMLButtonElement>;

  currentTheme: Theme = 'light';
  currentCurrency: Currency = 'USD';
  isThemeDropdownOpen = false;
  isCurrencyDropdownOpen = false;
  isProfileDropdownOpen = false;
  currencyDropdownTop = 70;
  currencyDropdownRight = 24;
  themeDropdownTop = 70;
  themeDropdownRight = 24;
  profileDropdownTop = 70;
  profileDropdownRight = 24;
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
    if (this.isCurrencyDropdownOpen) {
      this.isThemeDropdownOpen = false;
      this.isProfileDropdownOpen = false;
      this.updateDropdownPosition('currency');
    }
  }

  selectCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
    this.isCurrencyDropdownOpen = false;
  }

  toggleThemeDropdown(): void {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
    if (this.isThemeDropdownOpen) {
      this.isCurrencyDropdownOpen = false;
      this.isProfileDropdownOpen = false;
      this.updateDropdownPosition('theme');
    }
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.isThemeDropdownOpen = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    if (this.isProfileDropdownOpen) {
      this.isThemeDropdownOpen = false;
      this.isCurrencyDropdownOpen = false;
      this.updateDropdownPosition('profile');
    }
  }

  private updateDropdownPosition(which: 'currency' | 'theme' | 'profile'): void {
    setTimeout(() => {
      const btn = which === 'currency' ? this.currencyBtn : which === 'theme' ? this.themeBtn : this.profileBtn;
      if (!btn?.nativeElement) return;
      const rect = btn.nativeElement.getBoundingClientRect();
      const top = rect.bottom + 10;
      const right = window.innerWidth - rect.right;
      if (which === 'currency') {
        this.currencyDropdownTop = top;
        this.currencyDropdownRight = right;
      } else if (which === 'theme') {
        this.themeDropdownTop = top;
        this.themeDropdownRight = right;
      } else {
        this.profileDropdownTop = top;
        this.profileDropdownRight = right;
      }
    }, 0);
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
