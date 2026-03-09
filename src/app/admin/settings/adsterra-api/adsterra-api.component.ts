import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../../shared/admin-header/admin-header.component';
import { ToastService } from '../../../services/toast/toast.service';
import { AdsterraService } from '../../../services/adsterra/adsterra.service';

@Component({
  selector: 'app-adsterra-api',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './adsterra-api.component.html',
  styleUrls: ['./adsterra-api.component.scss'],
})
export class AdsterraApiComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  apiKey = '';
  maskedKey: string | null = null;
  hasApiKey = false;
  isLoading = false;
  isSaving = false;
  showApiKeyInput = false;

  constructor(
    private adsterraService: AdsterraService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadApiKeyStatus();
  }

  ngOnDestroy(): void {}

  loadApiKeyStatus(): void {
    this.isLoading = true;
    this.adsterraService.getApiKeyStatus().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.hasApiKey = response.data.hasApiKey;
          this.maskedKey = response.data.maskedKey;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load API key status:', error);
        this.toastService.showError('Failed to load API key status');
        this.isLoading = false;
      },
    });
  }

  toggleApiKeyInput(): void {
    this.showApiKeyInput = !this.showApiKeyInput;
    if (!this.showApiKeyInput) {
      this.apiKey = '';
    }
  }

  onSubmit(): void {
    if (!this.apiKey?.trim()) {
      this.toastService.showError('Please enter your Adsterra API key');
      return;
    }

    this.isSaving = true;
    this.adsterraService.updateApiKey(this.apiKey.trim()).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastService.showSuccess('Adsterra API key updated successfully');
          this.apiKey = '';
          this.showApiKeyInput = false;
          this.loadApiKeyStatus();
        }
        this.isSaving = false;
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Failed to update API key';
        this.toastService.showError(errorMessage);
        this.isSaving = false;
      },
    });
  }

  onCancel(): void {
    this.apiKey = '';
    this.showApiKeyInput = false;
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
