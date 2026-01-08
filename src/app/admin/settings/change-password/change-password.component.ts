import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../../services/theme.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { UserService } from '../../../services/user/user.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ToastService } from '../../../services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;

  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
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
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    // Close sidebar on mobile (<= 1024px), open on desktop (> 1024px)
    if (typeof window !== 'undefined') {
      this.isSidebarOpen = window.innerWidth > 1024;
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

  toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword || !this.passwordForm.confirmPassword) {
      this.toastService.showError('Please fill in all fields.');
      return;
    }

    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.toastService.showError('New password and confirm password do not match.');
      return;
    }

    if (this.passwordForm.newPassword.length < 6) {
      this.toastService.showError('New password must be at least 6 characters long.');
      return;
    }

    // Get user ID from localStorage
    const user = this.localStorageService.getLogger();
    if (!user || (!user.id && !user._id)) {
      this.toastService.showError('User information not found. Please login again.');
      return;
    }

    const userId = user.id || user._id;
    this.isLoading = true;

    // Call change password API
    const payload = {
      oldPassword: this.passwordForm.currentPassword,
      newPassword: this.passwordForm.newPassword
    };

    this.userService.changePassword(userId, payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastService.showSuccess('Password changed successfully!');
        
        // Reset form
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        this.showCurrentPassword = false;
        this.showNewPassword = false;
        this.showConfirmPassword = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error changing password:', error);
        this.toastService.showError(error?.error?.message || 'Failed to change password. Please try again.');
      }
    });
  }
}




