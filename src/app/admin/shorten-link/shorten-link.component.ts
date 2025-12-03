import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LinkService, Link } from '../../services/link/link.service';

@Component({
  selector: 'app-shorten-link',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shorten-link.component.html',
  styleUrls: ['./shorten-link.component.scss']
})
export class ShortenLinkComponent implements OnInit {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true;
  isUserMenuOpen = true;
  
  originalLink: string = '';
  isLoading: boolean = false;
  links: Link[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.loadLinks();
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

  toggleThemeDropdown(): void {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.isThemeDropdownOpen = false;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.localStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }

  onSubmit(): void {
    // Check if user is authenticated
    const token = this.localStorageService.getLoggerToken();
    if (!token || token === 'null' || token === 'undefined') {
      this.errorMessage = 'Please login to shorten links';
      this.successMessage = '';
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
      return;
    }

    if (!this.originalLink.trim()) {
      this.errorMessage = 'Please enter a valid URL';
      this.successMessage = '';
      return;
    }

    // Basic URL validation
    try {
      new URL(this.originalLink);
    } catch (e) {
      // If URL doesn't have protocol, add https://
      if (!this.originalLink.startsWith('http://') && !this.originalLink.startsWith('https://')) {
        this.originalLink = 'https://' + this.originalLink;
      } else {
        this.errorMessage = 'Please enter a valid URL';
        this.successMessage = '';
        return;
      }
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.linkService.createLink(this.originalLink).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.successMessage = 'Link shortened successfully!';
          this.originalLink = '';
          this.loadLinks(); // Reload the list
        } else {
          this.errorMessage = response.message || 'Failed to shorten link';
        }
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Session expired. Please login again.';
          setTimeout(() => {
            this.localStorageService.clearStorage();
            this.router.navigate(['/auth/login']);
          }, 2000);
        } else {
          this.errorMessage = error.error?.message || 'Failed to shorten link. Please try again.';
        }
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  loadLinks(): void {
    // Check if user is authenticated
    const token = this.localStorageService.getLoggerToken();
    if (!token || token === 'null' || token === 'undefined') {
      return;
    }

    this.linkService.getAllLinks().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.links = response.data || [];
        }
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          // Session expired, redirect to login
          this.localStorageService.clearStorage();
          this.router.navigate(['/auth/login']);
        } else {
          console.error('Failed to load links:', error);
        }
      }
    });
  }

  copyToClipboard(shortLink: string): void {
    // const fullShortLink = `${window.location.origin}/${shortLink}`;
    const fullShortLink = `${'http://localhost:3000'}/${shortLink}`;
    navigator.clipboard.writeText(fullShortLink).then(() => {
      this.successMessage = 'Link copied to clipboard!';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }).catch(() => {
      this.errorMessage = 'Failed to copy link';
    });
  }

  getFullShortLink(shortLink: string): string {
    // return `${window.location.origin}/${shortLink}`;
    return `${'http://localhost:3000'}/${shortLink}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  deleteLink(link: Link): void {
    // Show confirmation dialog
    if (confirm(`Are you sure you want to delete this link?\n\nOriginal: ${link.originalLink.substring(0, 50)}...\nShort: ${this.getFullShortLink(link.shortLink)}`)) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.linkService.deleteLink(link._id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.successMessage = 'Link deleted successfully!';
            this.loadLinks(); // Reload the list
            setTimeout(() => {
              this.successMessage = '';
            }, 3000);
          } else {
            this.errorMessage = response.message || 'Failed to delete link';
          }
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Session expired. Please login again.';
            setTimeout(() => {
              this.localStorageService.clearStorage();
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            this.errorMessage = error.error?.message || 'Failed to delete link. Please try again.';
          }
          this.successMessage = '';
          this.isLoading = false;
        }
      });
    }
  }
}

