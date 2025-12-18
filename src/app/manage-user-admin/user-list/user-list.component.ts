import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

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
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true;
  currentPage: number = 1;
  limit: number = 10;
  totalUsers: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers(this.currentPage, this.limit).subscribe({
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
        // You can show an error message to the user here
      }
    });
  }

  get filteredUsers(): User[] {
    let filtered = this.users;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        (user.name && user.name.toLowerCase().includes(term)) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(user => {
        // If status field exists, use it; otherwise, filter by role or other criteria
        if (user.status) {
          return user.status === this.selectedStatus;
        }
        // You can add custom logic here if status is not in the API response
        return true;
      });
    }

    return filtered;
  }

  onSearchChange(): void {
    // Search is handled by the getter
  }

  onStatusChange(): void {
    // Filtering is handled by the getter
  }

  viewUserLinks(user: User): void {
    this.router.navigate(['/manage-user-admin/user-wise-links', user._id]);
  }

  editUser(userId: string): void {
    // TODO: Implement edit user functionality
    console.log('Edit user:', userId);
  }

  deleteUser(user: User): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete user "${user.name || user.email}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id).subscribe({
          next: (response) => {
            if (response.status === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted successfully.',
                icon: 'success',
                confirmButtonColor: '#3085d6'
              });
              // Reload users after deletion
              this.loadUsers();
            } else {
              Swal.fire({
                title: 'Error!',
                text: response.message || 'Failed to delete user',
                icon: 'error',
                confirmButtonColor: '#3085d6'
              });
            }
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            Swal.fire({
              title: 'Error!',
              text: error.error?.message || 'Failed to delete user. Please try again.',
              icon: 'error',
              confirmButtonColor: '#3085d6'
            });
          }
        });
      }
    });
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
    // TODO: Implement toggle user status
    user.status = user.status === 'active' ? 'inactive' : 'active';
    console.log('Toggle status for user:', user._id);
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
