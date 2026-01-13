import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../../shared/admin-header/admin-header.component';
import { ToastService } from '../../../services/toast/toast.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { CurrencyService } from '../../../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  exchangeRate: number = 80;
  isLoading = false;
  isSaving = false;

  private exchangeRateSubscription?: Subscription;

  constructor(
    private settingsService: SettingsService,
    private currencyService: CurrencyService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadExchangeRate();
    
    // Subscribe to exchange rate changes
    this.exchangeRateSubscription = this.currencyService.getExchangeRate$().subscribe(rate => {
      this.exchangeRate = rate;
    });
  }

  ngOnDestroy(): void {
    if (this.exchangeRateSubscription) {
      this.exchangeRateSubscription.unsubscribe();
    }
  }

  loadExchangeRate(): void {
    this.isLoading = true;
    this.settingsService.getCurrencyExchangeRate().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data?.exchangeRate) {
          this.exchangeRate = response.data.exchangeRate;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load exchange rate:', error);
        this.toastService.showError('Failed to load exchange rate');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.exchangeRate <= 0 || !this.exchangeRate) {
      this.toastService.showError('Exchange rate must be a positive number');
      return;
    }

    this.isSaving = true;
    this.settingsService.updateCurrencyExchangeRate(this.exchangeRate).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.toastService.showSuccess('Exchange rate updated successfully');
          // Refresh the exchange rate in currency service
          this.currencyService.refreshExchangeRate();
        }
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Failed to update exchange rate:', error);
        const errorMessage = error.error?.message || 'Failed to update exchange rate';
        this.toastService.showError(errorMessage);
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    // Reload the original value
    this.loadExchangeRate();
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

