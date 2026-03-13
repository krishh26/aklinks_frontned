import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { AdsterraService } from '../../services/adsterra/adsterra.service';
import { CurrencyService } from '../../services/currency.service';
import { ToastService } from '../../services/toast/toast.service';

type TabType = 'domains' | 'placements' | 'smartlinks' | 'stats';

@Component({
  selector: 'app-adsterra-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './adsterra-analytics.component.html',
  styleUrls: ['./adsterra-analytics.component.scss'],
})
export class AdsterraAnalyticsComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  activeTab: TabType = 'domains';
  isLoading = false;
  errorMessage = '';

  // Data
  domains: any[] = [];
  placements: any[] = [];
  domainPlacements: any[] = [];
  selectedDomainId = '';
  smartLinks: any[] = [];
  stats: any[] = [];
  statsItems: any[] = [];

  // Stats filters
  statsStartDate = '';
  statsFinishDate = '';
  statsDomainId = '';
  statsPlacementId = '';
  statsGroupBy = 'date';
  statsCountry = '';

  constructor(
    private adsterraService: AdsterraService,
    private currencyService: CurrencyService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
    this.setDefaultDates();
  }

  ngOnInit(): void {
    this.loadDomains();
  }

  ngOnDestroy(): void {}

  private setDefaultDates(): void {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.statsFinishDate = today.toISOString().split('T')[0];
    this.statsStartDate = weekAgo.toISOString().split('T')[0];
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
    this.errorMessage = '';
    if (tab === 'domains') this.loadDomains();
    else if (tab === 'placements') this.loadPlacements();
    else if (tab === 'smartlinks') this.loadSmartLinks();
    else if (tab === 'stats') this.loadStats();
  }

  loadDomains(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adsterraService.getDomains().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const data = res.data;
          this.domains = Array.isArray(data) ? data : (data?.items || data?.domains || []);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load domains. Ensure API key is configured.';
        this.toastService.showError(this.errorMessage);
        this.isLoading = false;
      },
    });
  }

  onDomainSelect(domainId: string): void {
    this.selectedDomainId = domainId;
    if (!domainId) {
      this.domainPlacements = [];
      return;
    }
    this.isLoading = true;
    this.adsterraService.getDomainPlacements(domainId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const data = res.data;
          this.domainPlacements = Array.isArray(data) ? data : (data?.items || data?.placements || []);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load placements.';
        this.isLoading = false;
      },
    });
  }

  loadPlacements(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adsterraService.getAllPlacements().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const data = res.data;
          this.placements = Array.isArray(data) ? data : (data?.items || data?.placements || []);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load placements.';
        this.toastService.showError(this.errorMessage);
        this.isLoading = false;
      },
    });
  }

  loadSmartLinks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adsterraService.getSmartLinks().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const data = res.data;
          this.smartLinks = Array.isArray(data) ? data : (data?.items || []);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load SmartLinks.';
        this.toastService.showError(this.errorMessage);
        this.isLoading = false;
      },
    });
  }

  loadStats(): void {
    if (!this.statsStartDate || !this.statsFinishDate) {
      this.toastService.showError('Please select start and finish dates.');
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.adsterraService
      .getStatistics({
        start_date: this.statsStartDate,
        finish_date: this.statsFinishDate,
        domain: this.statsDomainId || undefined,
        placement: this.statsPlacementId || undefined,
        group_by: this.statsGroupBy || undefined,
        country: this.statsCountry || undefined,
      })
      .subscribe({
        next: (res) => {
          console.log('[AdsterraAnalyticsComponent] loadStats response ----', res);
          if (res.status === 'success') {
            const data = res.data;
            this.statsItems = Array.isArray(data) ? data : (data?.items || data?.stats || []);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to load statistics.';
          this.toastService.showError(this.errorMessage);
          this.isLoading = false;
        },
      });
  }

  formatCurrency(usd: number): string {
    return this.currencyService.format(usd ?? 0);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.showSuccess('Copied to clipboard!');
    });
  }

  getStatsColumns(): string[] {
    if (this.statsItems.length === 0) return [];
    const first = this.statsItems[0];
    return Object.keys(first);
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
