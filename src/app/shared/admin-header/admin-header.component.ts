import { Component, OnInit, OnDestroy, HostListener, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { CurrencyService, Currency } from '../../services/currency.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs';
import { LinkService, Link } from '../../services/link/link.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="admin-header">
      <div class="admin-header-inner">
      <div class="header-left">
        <button class="sidebar-toggle-header-btn" *ngIf="!isSidebarOpen" (click)="onSidebarToggle()" title="Open Sidebar">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <button class="shorten-link-btn" (click)="navigateToShortenLink()">
          Shorten Link
          <span class="plus-icon">+</span>
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

    <div class="shorten-link-modal-backdrop" *ngIf="isShortenLinkModalOpen" (click)="closeShortenLinkModal()">
      <div class="shorten-link-modal" (click)="$event.stopPropagation()">
        <div class="shorten-link-modal-header">
          <h2>Shorten Link</h2>
          <button type="button" class="modal-close-btn" (click)="closeShortenLinkModal()">×</button>
        </div>

        <div class="shorten-link-modal-body">
          <div class="latest-short-link-section" *ngIf="latestLink as link">
            <div class="latest-short-link-heading">Short link</div>
            <div class="latest-short-link-pill">
              <span class="latest-short-link-url" [title]="getFullShortLink(link.shortLink)">{{ getFullShortLink(link.shortLink) }}</span>
              <button
                type="button"
                class="latest-short-link-copy-btn"
                (click)="copyToClipboard(link.shortLink)"
                title="Copy link">
                <svg class="latest-short-link-copy-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="message-container" *ngIf="errorMessage || successMessage">
            <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
            <div class="success-message" *ngIf="successMessage">{{ successMessage }}</div>
          </div>

          <div class="form-card">
            <form (ngSubmit)="onSubmit()" #shortenLinkForm="ngForm">
              <div class="form-group">
                <label for="modalOriginalLink" class="form-label">Enter URL to Shorten</label>
                <input
                  type="url"
                  id="modalOriginalLink"
                  name="originalLink"
                  [(ngModel)]="originalLink"
                  class="form-input"
                  placeholder="https://example.com/very-long-url"
                  required>
              </div>

              <button type="submit" class="submit-btn" [disabled]="!shortenLinkForm.valid || isLoading">
                <span *ngIf="!isLoading">Shorten Link</span>
                <span *ngIf="isLoading">Generating...</span>
              </button>
            </form>
          </div>

          <div class="links-container">
            <h3 class="section-title">Your Shortened Links</h3>

            <div class="table-container" *ngIf="links.length > 0; else emptyLinks">
              <table class="links-table">
                <thead>
                  <tr>
                    <th>Original Link</th>
                    <th>Short Link</th>
                    <th>Clicks</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let link of links">
                    <td class="link-cell">
                      <a [href]="link.originalLink" target="_blank" class="original-link">
                        {{ link.originalLink.length > 50 ? (link.originalLink | slice:0:50) + '...' : link.originalLink }}
                      </a>
                    </td>
                    <td class="link-cell">
                      <span class="short-link">{{ getFullShortLink(link.shortLink) }}</span>
                    </td>
                    <td>{{ link.clicks }}</td>
                    <td>{{ formatDate(link.createdAt) }}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="copy-btn" (click)="copyToClipboard(link.shortLink)" title="Copy Link">
                          Copy
                        </button>
                        <button class="delete-btn" (click)="deleteLink(link)" title="Delete Link">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ng-template #emptyLinks>
              <div class="empty-state">
                <p>No shortened links yet. Create your first shortened link above!</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
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
  isShortenLinkModalOpen = false;
  originalLink: string = '';
  isLoading: boolean = false;
  links: Link[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private themeService: ThemeService,
    private currencyService: CurrencyService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private linkService: LinkService,
    private toastService: ToastService
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

  openShortenLinkModal(): void {
    this.isShortenLinkModalOpen = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.loadLinks();
  }

  closeShortenLinkModal(): void {
    this.isShortenLinkModalOpen = false;
  }

  navigateToShortenLink(): void {
    this.openShortenLinkModal();
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

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isShortenLinkModalOpen) {
      this.closeShortenLinkModal();
    }
  }

  onSubmit(): void {
    const token = this.localStorageService.getLoggerToken();
    if (!token || token === 'null' || token === 'undefined') {
      this.toastService.showError('Please login to shorten links');
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
      return;
    }

    if (!this.originalLink.trim()) {
      this.toastService.showError('Please enter a valid URL');
      return;
    }

    try {
      new URL(this.originalLink);
    } catch (e) {
      if (!this.originalLink.startsWith('http://') && !this.originalLink.startsWith('https://')) {
        this.originalLink = 'https://' + this.originalLink;
      } else {
        this.toastService.showError('Please enter a valid URL');
        return;
      }
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.linkService.createLink(this.originalLink).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastService.showSuccess('Link shortened successfully!');
          this.originalLink = '';
          this.loadLinks();
        } else {
          const errorMsg = response.message || 'Failed to shorten link';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
        }
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          this.toastService.showError('Session expired. Please login again.');
          setTimeout(() => {
            this.localStorageService.clearStorage();
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          const errorMsg = error.error?.message || 'Failed to shorten link. Please try again.';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
        }
        this.isLoading = false;
      }
    });
  }

  loadLinks(): void {
    const token = this.localStorageService.getLoggerToken();
    if (!token || token === 'null' || token === 'undefined') {
      return;
    }
    let userId: string | undefined = undefined;
    const user = this.localStorageService.getLogger();
    if (user && user !== '' && typeof user === 'object') {
      userId = user._id || user.id || undefined;
    }

    if(!userId) {
      this.toastService.showError('User not found');
      return;
    }

    this.linkService.getUserLinks(userId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.links = response.data || [];
        }
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          this.localStorageService.clearStorage();
          this.router.navigate(['/auth/login']);
        } else {
          console.error('Failed to load links:', error);
        }
      }
    });
  }

  copyToClipboard(shortLink: string): void {
    const fullShortLink = `${'http://ads.aklinks.in'}/${shortLink}`;
    navigator.clipboard.writeText(fullShortLink).then(() => {
      this.toastService.showSuccess('Link copied to clipboard!');
    }).catch(() => {
      this.toastService.showError('Failed to copy link');
    });
  }

  getFullShortLink(shortLink: string): string {
    return `${'http://ads.aklinks.in'}/${shortLink}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /** Most recently created link (by createdAt). */
  get latestLink(): Link | null {
    if (!this.links?.length) {
      return null;
    }
    return [...this.links].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }

  deleteLink(link: Link): void {
    if (confirm(`Are you sure you want to delete this link?\n\nOriginal: ${link.originalLink.substring(0, 50)}...\nShort: ${this.getFullShortLink(link.shortLink)}`)) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.linkService.deleteLink(link._id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.toastService.showSuccess('Link deleted successfully!');
            this.loadLinks();
          } else {
            const errorMsg = response.message || 'Failed to delete link';
            this.errorMessage = errorMsg;
            this.toastService.showError(errorMsg);
          }
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 401 || error.status === 403) {
            this.toastService.showError('Session expired. Please login again.');
            setTimeout(() => {
              this.localStorageService.clearStorage();
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            const errorMsg = error.error?.message || 'Failed to delete link. Please try again.';
            this.errorMessage = errorMsg;
            this.toastService.showError(errorMsg);
          }
          this.isLoading = false;
        }
      });
    }
  }
}
