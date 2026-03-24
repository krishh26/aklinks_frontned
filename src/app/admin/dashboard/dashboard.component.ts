import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CurrencyService } from '../../services/currency.service';
import {
  AdminDashboardService,
  AdminDashboardDailyRow,
} from '../../services/admin-dashboard/admin-dashboard.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  isSidebarOpen = false;
  private currencySubscription?: Subscription;
  private chart: Chart | null = null;

  todaysEarning = 0;
  todaysCpmCount = 0;
  todaysView = 0;
  todaysReferral = 0;

  totalEarning = 0;
  totalCpmCount = 0;
  totalView = 0;
  totalReferral = 0;

  statsTableRows: AdminDashboardDailyRow[] = [];
  dashboardLoaded = false;
  isDashboardLoading = false;

  activeCard: 'earning' | 'cpm' | 'views' | 'referral' | null = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private currencyService: CurrencyService,
    private adminDashboardService: AdminDashboardService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      if (this.chart) {
        this.chart.update();
      }
    });
    this.loadAdminDashboard();
  }

  private isAdmin(): boolean {
    const user = this.localStorageService.getLogger();
    return user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'super_admin';
  }

  private loadAdminDashboard(): void {
    if (!this.isAdmin()) {
      this.dashboardLoaded = true;
      return;
    }
    this.isDashboardLoading = true;
    this.adminDashboardService.getDashboard().subscribe({
      next: (res) => {
        if (res.status === 'success' && res.data) {
          const d = res.data;
          const t = d.today;
          const tot = d.totals;

          this.todaysEarning = t.earnings ?? 0;
          this.todaysView = t.views ?? t.clicks ?? 0;
          this.todaysCpmCount = t.cpm ?? 0;
          this.todaysReferral = t.referralBonus ?? 0;

          this.totalEarning = tot.earnings ?? 0;
          this.totalView = tot.clicks ?? tot.impressions ?? 0;
          this.totalCpmCount = tot.cpm ?? 0;
          this.totalReferral = tot.referralBonus ?? 0;

          this.statsTableRows = Array.isArray(d.dailySeries) ? [...d.dailySeries] : [];
          this.applyChartFromSeries();
        }
        this.dashboardLoaded = true;
        this.isDashboardLoading = false;
      },
      error: (err) => {
        console.error('[Dashboard] Admin stats error', err);
        this.dashboardLoaded = true;
        this.isDashboardLoading = false;
      },
    });
  }

  private applyChartFromSeries(): void {
    const rows = [...this.statsTableRows].sort((a, b) => a.date.localeCompare(b.date));
    if (rows.length === 0) {
      if (this.chart) {
        this.chart.data.labels = [];
        (this.chart.data.datasets[0] as any).data = [];
        (this.chart.data.datasets[1] as any).data = [];
        this.chart.update();
      }
      return;
    }
    if (this.chart) {
      this.chart.data.labels = rows.map((r) => r.date);
      (this.chart.data.datasets[0] as any).data = rows.map((r) => r.views);
      (this.chart.data.datasets[1] as any).data = rows.map((r) => r.earnings);
      this.chart.update();
    }
  }

  getStatsTableRows(): AdminDashboardDailyRow[] {
    return this.statsTableRows;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initChart();
      this.applyChartFromSeries();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    const canvas = document.getElementById('dashboardChart') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [] as string[],
        datasets: [
          {
            label: 'Total Views',
            data: [] as number[],
            borderColor: 'rgb(102, 126, 234)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'Earnings',
            data: [] as number[],
            borderColor: 'rgb(118, 75, 162)',
            backgroundColor: 'rgba(118, 75, 162, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.datasetIndex === 1) {
                  const value = context.parsed.y ?? 0;
                  return `${context.dataset.label}: ${this.formatCurrency(value)}`;
                }
                const value = context.parsed.y ?? 0;
                return `${context.dataset.label}: ${value}`;
              },
            },
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Views',
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Earnings (USD)',
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
    this.applyChartFromSeries();
  }

  formatCurrency(usdAmount: number): string {
    return this.currencyService.format(usdAmount);
  }

  isValidNumber(value: unknown): boolean {
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
  }

  sanitizedCount(value: unknown, fallback: number = 0): number {
    const num = Number(value);
    if (!isNaN(num) && isFinite(num) && num >= 0) {
      return num;
    }
    return fallback;
  }

  toggleCard(card: 'earning' | 'cpm' | 'views' | 'referral'): void {
    this.activeCard = this.activeCard === card ? null : card;
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

  navigateToShortenLink() {
    this.router.navigate(['/admin/shorten-link']);
  }
}
