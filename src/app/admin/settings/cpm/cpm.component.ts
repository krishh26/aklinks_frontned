import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../../shared/admin-header/admin-header.component';
import { ToastService } from '../../../services/toast/toast.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { CpmService } from '../../../services/cpm.service';

@Component({
  selector: 'app-cpm',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './cpm.component.html',
  styleUrls: ['./cpm.component.scss']
})
export class CpmComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  cpm: number = 5;
  isLoading = false;
  isSaving = false;

  private cpmSubscription?: Subscription;

  constructor(
    private settingsService: SettingsService,
    private cpmService: CpmService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadCpm();

    this.cpmSubscription = this.cpmService.getCpm$().subscribe((val) => {
      this.cpm = val;
    });
  }

  ngOnDestroy(): void {
    this.cpmSubscription?.unsubscribe();
  }

  loadCpm(): void {
    this.isLoading = true;
    this.settingsService.getCpmValue().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          const parsed = Number(response.data?.cpm);
          if (!isNaN(parsed) && isFinite(parsed) && parsed > 0) {
            this.cpm = parsed;
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load CPM:', error);
        this.toastService.showError('Failed to load CPM');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    const value = Number(this.cpm);
    if (!value || isNaN(value) || !isFinite(value) || value <= 0) {
      this.toastService.showError('CPM must be a positive number');
      return;
    }

    this.isSaving = true;
    this.settingsService.updateCpmValue(value).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastService.showSuccess('CPM updated successfully');
          this.cpmService.refreshCpm();
        }
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Failed to update CPM:', error);
        const errorMessage = error.error?.message || 'Failed to update CPM';
        this.toastService.showError(errorMessage);
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.loadCpm();
  }

  @HostListener('window:resize')
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

