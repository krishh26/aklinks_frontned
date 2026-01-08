import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  provider?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  googleId?: string;
  status?: string;
  lastLogin?: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedRole: string = 'all';
  dateFrom: string = '';
  dateTo: string = '';
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;
  currentPage: number = 1;
  limit: number = 10;
  totalUsers: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private userService: UserService,
    private toastService: ToastService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.loadUsers();
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

  loadUsers(): void {
    this.isLoading = true;
    const search = this.searchTerm.trim() || undefined;
    const status = this.selectedStatus !== 'all' ? this.selectedStatus : undefined;
    const role = this.selectedRole !== 'all' ? this.selectedRole : undefined;
    const dateFrom = this.dateFrom || undefined;
    const dateTo = this.dateTo || undefined;

    this.userService.getAllUsers(this.currentPage, this.limit, search, status, role, dateFrom, dateTo).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success' && response.data) {
          // Handle API response structure
          if (response.data.users && Array.isArray(response.data.users)) {
            this.users = response.data.users;
            
            // Extract pagination info
            if (response.data.pagination) {
              // Use pagination data from API response
              this.totalPages = response.data.pagination.totalPages || 1;
              this.totalUsers = response.data.pagination.totalUsers || 0;
              // Ensure limit matches what we requested (10)
              this.limit = 10;
            } else {
              // Fallback if pagination is not provided
              this.totalUsers = response.data.users.length;
              this.totalPages = Math.ceil(this.totalUsers / this.limit);
              this.limit = 10;
            }
          } else {
            console.error('Invalid response structure:', response);
            this.users = [];
          }
        } else {
          console.error('Failed to load users:', response.message);
          this.users = [];
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading users:', error);
        this.users = [];
        this.toastService.showError(error.error?.message || 'Failed to load users. Please try again.');
      }
    });
  }

  get filteredUsers(): User[] {
    // Since filtering is now done on the backend, we just return all users
    return this.users;
  }

  onSearchChange(): void {
    // Reset to first page and reload with search filter
    this.currentPage = 1;
    this.loadUsers();
  }

  onStatusChange(): void {
    // Reset to first page and reload with status filter
    this.currentPage = 1;
    this.loadUsers();
  }

  onRoleChange(): void {
    // Reset to first page and reload with role filter
    this.currentPage = 1;
    this.loadUsers();
  }

  onDateRangeChange(): void {
    // Reset to first page and reload with date range filter
    this.currentPage = 1;
    this.loadUsers();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'all';
    this.selectedRole = 'all';
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage = 1;
    this.loadUsers();
  }

  viewUserLinks(user: User): void {
    this.router.navigate(['/manage-user-admin/user-wise-links', user._id]);
  }

  editUser(userId: string): void {
    // TODO: Implement edit user functionality
    console.log('Edit user:', userId);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.name || user.email}"?`)) {
      this.userService.deleteUser(user._id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.toastService.showSuccess('User has been deleted successfully.');
            // Reload users after deletion
            this.loadUsers();
          } else {
            this.toastService.showError(response.message || 'Failed to delete user');
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toastService.showError(error.error?.message || 'Failed to delete user. Please try again.');
        }
      });
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  toggleUserStatus(user: User): void {
    if (!user._id) {
      console.error('User ID is required');
      return;
    }

    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const actionText = newStatus === 'active' ? 'activate' : 'deactivate';

    if (confirm(`Do you want to ${actionText} user "${user.name || user.email}"?`)) {
      this.isLoading = true;
      this.userService.toggleUserStatus(user._id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.toastService.showSuccess(`User has been ${actionText}d successfully.`);
            // Reload users to ensure data consistency
            this.loadUsers();
          } else {
            this.isLoading = false;
            this.toastService.showError(response.message || `Failed to ${actionText} user`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error toggling user status:', error);
          this.toastService.showError(error.error?.message || `Failed to ${actionText} user. Please try again.`);
        }
      });
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

  // Expose Math to template
  Math = Math;
}



