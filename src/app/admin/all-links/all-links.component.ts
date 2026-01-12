import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LinkService, Link } from '../../services/link/link.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-all-links',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './all-links.component.html',
  styleUrls: ['./all-links.component.scss']
})
export class AllLinksComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  links: Link[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private linkService: LinkService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    // Small delay to ensure localStorage is ready
    setTimeout(() => {
      this.loadLinks();
    }, 100);
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
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

  loadLinks(): void {
    // Check if user is authenticated
    const token = this.localStorageService.getLoggerToken();
    if (!token || token === 'null' || token === 'undefined') {
      this.errorMessage = 'Please login to view your links';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    const user = this.localStorageService.getLogger();
    
    // Check if user exists and has _id or id property
    let userId: string | null = null;
    if (user && user !== '' && typeof user === 'object') {
      userId = user._id || user.id || null;
    }
    
    if (userId) {
      // For regular users, get their own links using getUserLinks
      this.linkService.getUserLinks(userId).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.links = response.data || [];
          } else {
            this.errorMessage = response.message || 'Failed to load links';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading user links:', error);
          if (error.status === 401 || error.status === 403) {
            // Session expired, redirect to login
            this.toastService.showError('Session expired. Please login again.');
            setTimeout(() => {
              this.localStorageService.clearStorage();
              this.router.navigate(['/auth/login']);
            }, 1500);
          } else {
            this.errorMessage = error.error?.message || 'Failed to load links';
            this.toastService.showError(this.errorMessage);
          }
          this.isLoading = false;
        }
      });
    } else {
      // If user data is not available, try getAllLinks (for admins or if getUserLinks endpoint doesn't work)
      this.linkService.getAllLinks().subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.links = response.data || [];
          } else {
            this.errorMessage = response.message || 'Failed to load links';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading all links:', error);
          if (error.status === 401 || error.status === 403) {
            // Session expired, redirect to login
            this.toastService.showError('Session expired. Please login again.');
            setTimeout(() => {
              this.localStorageService.clearStorage();
              this.router.navigate(['/auth/login']);
            }, 1500);
          } else {
            this.errorMessage = error.error?.message || 'Failed to load links';
            this.toastService.showError(this.errorMessage);
          }
          this.isLoading = false;
        }
      });
    }
  }

  copyToClipboard(shortLink: string): void {
    const fullShortLink = `${window.location.origin}/${shortLink}`;
    navigator.clipboard.writeText(fullShortLink).then(() => {
      this.toastService.showSuccess('Link copied to clipboard!');
    }).catch(() => {
      this.toastService.showError('Failed to copy link');
    });
  }

  getFullShortLink(shortLink: string): string {
    return `${window.location.origin}/${shortLink}`;
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
    if (confirm(`Are you sure you want to delete this link?\n\nOriginal: ${link.originalLink.substring(0, 50)}...\nShort: ${this.getFullShortLink(link.shortLink)}`)) {
      this.isLoading = true;
      this.linkService.deleteLink(link._id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.toastService.showSuccess('Link deleted successfully!');
            this.loadLinks();
          } else {
            this.toastService.showError(response.message || 'Failed to delete link');
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
            this.toastService.showError(error.error?.message || 'Failed to delete link. Please try again.');
          }
          this.isLoading = false;
        }
      });
    }
  }
}
