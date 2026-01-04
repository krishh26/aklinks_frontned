import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { LinkService } from '../../services/link/link.service';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: string;
  createdAt: string;
  lastClicked?: string;
}

@Component({
  selector: 'app-user-wise-links',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent],
  templateUrl: './user-wise-links.component.html',
  styleUrls: ['./user-wise-links.component.scss']
})
export class UserWiseLinksComponent implements OnInit, OnDestroy {
  userId: string = '';
  userName: string = '';
  links: Link[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private linkService: LinkService,
    private userService: UserService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadUserLinks();
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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

  loadUserLinks(): void {
    if (!this.userId) {
      return;
    }

    this.isLoading = true;

    // Fetch user name
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data?.user) {
          this.userName = response.data.user.name;
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.userName = 'Unknown User';
      }
    });

    // Fetch user links with filters
    const search = this.searchTerm.trim() || undefined;
    const status = this.selectedStatus !== 'all' ? this.selectedStatus : undefined;

    this.linkService.getUserLinks(this.userId, search, status).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          // Map backend response to frontend interface
          this.links = response.data.map((link: any) => ({
            id: link.id || link._id,
            shortUrl: link.shortLink,
            originalUrl: link.originalLink,
            clicks: link.clicks || 0,
            status: link.status || (link.deleted ? 'inactive' : 'active'),
            createdAt: link.createdAt ? new Date(link.createdAt).toLocaleDateString() : '',
            lastClicked: link.lastClicked ? new Date(link.lastClicked).toLocaleDateString() : undefined
          }));
        } else {
          this.links = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user links:', error);
        this.links = [];
        this.isLoading = false;
      }
    });
  }

  get filteredLinks(): Link[] {
    // Since filtering is now done on the backend, we just return all links
    return this.links;
  }

  onSearchChange(): void {
    // Reload links with search filter
    this.loadUserLinks();
  }

  onStatusChange(): void {
    // Reload links with status filter
    this.loadUserLinks();
  }

  goBack(): void {
    this.router.navigate(['/manage-user-admin/user-list']);
  }

  editLink(linkId: string): void {
    // TODO: Implement edit link functionality
    console.log('Edit link:', linkId);
  }

  deleteLink(link: Link): void {
    if (!link.id) {
      console.error('Link ID is required');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this link?\n\nShort URL: ${link.shortUrl}\nOriginal URL: ${link.originalUrl.substring(0, 50)}${link.originalUrl.length > 50 ? '...' : ''}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.linkService.adminDeleteLink(link.id).subscribe({
          next: (response) => {
            if (response.status === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: 'Link has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#3085d6'
              });
              // Reload links after deletion
              this.loadUserLinks();
            } else {
              this.isLoading = false;
              Swal.fire({
                title: 'Error!',
                text: response.message || 'Failed to delete link',
                icon: 'error',
                confirmButtonColor: '#3085d6'
              });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error deleting link:', error);
            Swal.fire({
              title: 'Error!',
              text: error.error?.message || 'Failed to delete link. Please try again.',
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
          }
        });
      }
    });
  }

  toggleLinkStatus(link: Link): void {
    if (!link.id) {
      console.error('Link ID is required');
      return;
    }

    const newStatus = link.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';
    const actionText = newStatus === 'active' ? 'activate' : 'deactivate';
    const titleText = newStatus === 'active' ? 'Activate Link?' : 'Deactivate Link?';
    const confirmText = newStatus === 'active' ? 'Yes, activate it!' : 'Yes, deactivate it!';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${actionText} this link?\n\nShort URL: ${link.shortUrl}\nOriginal URL: ${link.originalUrl.substring(0, 50)}${link.originalUrl.length > 50 ? '...' : ''}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'active' ? '#16a34a' : '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.linkService.toggleLinkStatus(link.id).subscribe({
          next: (response) => {
            if (response.status === 'success') {
              Swal.fire({
                title: 'Success!',
                text: `Link has been ${actionText}d successfully.`,
                icon: 'success',
                confirmButtonColor: '#3085d6'
              });
              // Reload links to ensure data consistency
              this.loadUserLinks();
            } else {
              this.isLoading = false;
              Swal.fire({
                title: 'Error!',
                text: response.message || `Failed to ${actionText} link`,
                icon: 'error',
                confirmButtonColor: '#3085d6'
              });
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error toggling link status:', error);
            Swal.fire({
              title: 'Error!',
              text: error.error?.message || `Failed to ${actionText} link. Please try again.`,
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
          }
        });
      }
    });
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
}



