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
  referralSettings = {
    commissionRate: 10,
    minimumPayout: 10.00,
    referralBonus: 5.00,
    enableReferralProgram: true,
    maxReferralsPerUser: 0, // 0 means unlimited
    referralLinkPrefix: 'https://aklinks.com/signup?ref='
  };

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
    // TODO: Replace with actual API call when backend is ready
    // this.settingsService.getReferralSettings().subscribe({
    //   next: (response) => {
    //     if (response.status === 'success' && response.data) {
    //       this.referralSettings = { ...this.referralSettings, ...response.data };
    //     }
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Failed to load referral settings:', error);
    //     this.toastService.showError('Failed to load referral settings');
    //     this.isLoading = false;
    //   }
    // });
    
    // Simulate loading for now
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  onSubmit(): void {
    // Validation
    if (this.referralSettings.commissionRate < 0 || this.referralSettings.commissionRate > 100) {
      this.toastService.showError('Commission rate must be between 0 and 100');
      return;
    }

    if (this.referralSettings.minimumPayout < 0) {
      this.toastService.showError('Minimum payout must be a positive number');
      return;
    }

    if (this.referralSettings.referralBonus < 0) {
      this.toastService.showError('Referral bonus must be a positive number');
      return;
    }

    if (this.referralSettings.maxReferralsPerUser < 0) {
      this.toastService.showError('Max referrals per user must be 0 (unlimited) or a positive number');
      return;
    }

    this.isSaving = true;
    // TODO: Replace with actual API call when backend is ready
    // this.settingsService.updateReferralSettings(this.referralSettings).subscribe({
    //   next: (response) => {
    //     if (response.status === 'success') {
    //       this.toastService.showSuccess('Referral settings updated successfully');
    //     }
    //     this.isSaving = false;
    //   },
    //   error: (error) => {
    //     console.error('Failed to update referral settings:', error);
    //     const errorMessage = error.error?.message || 'Failed to update referral settings';
    //     this.toastService.showError(errorMessage);
    //     this.isSaving = false;
    //   }
    // });

    // Simulate saving for now
    setTimeout(() => {
      this.toastService.showSuccess('Referral settings updated successfully');
      this.isSaving = false;
    }, 1000);
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
