import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
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
  isSidebarOpen = true; // Sidebar is open by default

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    // TODO: Implement API call to fetch users
    // For now, using mock data
    setTimeout(() => {
      this.users = [
        {
          id: '1',
          username: 'john_doe',
          email: 'john@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2024-01-15',
          lastLogin: '2024-01-20'
        },
        {
          id: '2',
          username: 'jane_smith',
          email: 'jane@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-10',
          lastLogin: '2024-01-19'
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  get filteredUsers(): User[] {
    let filtered = this.users;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }

    return filtered;
  }

  onSearchChange(): void {
    // Search is handled by the getter
  }

  onStatusChange(): void {
    // Filtering is handled by the getter
  }

  editUser(userId: string): void {
    // TODO: Implement edit user functionality
    console.log('Edit user:', userId);
  }

  deleteUser(userId: string): void {
    // TODO: Implement delete user functionality
    if (confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
    }
  }

  toggleUserStatus(user: User): void {
    // TODO: Implement toggle user status
    user.status = user.status === 'active' ? 'inactive' : 'active';
    console.log('Toggle status for user:', user.id);
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

