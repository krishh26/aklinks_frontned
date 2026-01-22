import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../../shared/admin-header/admin-header.component';
import { ToastService } from '../../../services/toast/toast.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-refer-earn-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './refer-earn-setting.component.html',
  styleUrls: ['./refer-earn-setting.component.scss']
})
export class ReferEarnSettingComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isLoading = false;
  isSaving = false;

  // Refer & Earn Settings
  referAmount: number = 0;

  private settingsSubscription?: Subscription;

  constructor(
    private settingsService: SettingsService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.checkScreenSize();
    this.checkAdminRole();
  }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadReferralSettings();
  }

  checkAdminRole(): void {
    const user = this.localStorageService.getLogger();
    if (user && user.role) {
      const userRole = user.role.toLowerCase();
      if (userRole !== 'admin') {
        // Redirect non-admin users to dashboard
        this.toastService.showError('Access denied. Admin role required.');
        this.router.navigate(['/admin/dashboard']);
        return;
      }
    } else {
      // No user data, redirect to login
      this.toastService.showError('Please login to access this page.');
      this.router.navigate(['/auth/login']);
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  loadReferralSettings(): void {
    this.isLoading = true;
    this.settingsService.getReferAmount().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.referAmount = response.data.referAmount || 0;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load refer amount:', error);
        this.toastService.showError('Failed to load refer amount');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    // Validation
    if (this.referAmount < 0) {
      this.toastService.showError('Refer amount must be a non-negative number');
      return;
    }

    this.isSaving = true;
    this.settingsService.updateReferAmount(this.referAmount).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastService.showSuccess('Refer amount updated successfully');
        }
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Failed to update refer amount:', error);
        const errorMessage = error.error?.message || 'Failed to update refer amount';
        this.toastService.showError(errorMessage);
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    // Reload the original values
    this.loadReferralSettings();
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
}
