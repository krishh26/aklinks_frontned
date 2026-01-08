import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LinkService, Link } from '../../services/link/link.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-shorten-link',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './shorten-link.component.html',
  styleUrls: ['./shorten-link.component.scss']
})
export class ShortenLinkComponent implements OnInit, OnDestroy {
  isSidebarOpen = false; // Will be set based on screen size
  
  originalLink: string = '';
  isLoading: boolean = false;
  links: Link[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private linkService: LinkService,
    private toastService: ToastService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadLinks();
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    // Close sidebar on mobile (<= 1024px), open on desktop (> 1024px)
    if (typeof window !== 'undefined') {
      this.isSidebarOpen = window.innerWidth > 1024;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // Logout is handled by the sidebar component

  onSubmit(): void {
    // Check if user is authenticated
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

    // Basic URL validation
    try {
      new URL(this.originalLink);
    } catch (e) {
      // If URL doesn't have protocol, add https://
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
          this.loadLinks(); // Reload the list
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
      this.toastService.showSuccess('Link copied to clipboard!');
    }).catch(() => {
      this.toastService.showError('Failed to copy link');
    });
  }

  getFullShortLink(shortLink: string): string {
    return `${window.location.origin}/${shortLink}`;
    // return `${'http://localhost:3000'}/${shortLink}`;
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
            this.toastService.showSuccess('Link deleted successfully!');
            this.loadLinks(); // Reload the list
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

