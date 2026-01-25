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
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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

