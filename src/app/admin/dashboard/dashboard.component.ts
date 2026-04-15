import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CurrencyService } from '../../services/currency.service';
import {
  AdminDashboardService,
  AdminDashboardDailyRow,
} from '../../services/admin-dashboard/admin-dashboard.service';
import {
  DashboardWidgetsService,
  DashboardRecentActivityItem,
  DashboardTopLinkItem,
} from '../../services/dashboard-widgets/dashboard-widgets.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { Subscription, forkJoin } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { CpmService } from '../../services/cpm.service';

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
  private cpmSubscription?: Subscription;
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

  recentActivities: DashboardRecentActivityItem[] = [];
  topPerformingLinks: DashboardTopLinkItem[] = [];
  activityScope: 'all' | 'user' | null = null;
  topLinksScope: 'all' | 'user' | null = null;
  widgetsLoaded = false;
  widgetsLoading = false;

  activeCard: 'earning' | 'cpm' | 'views' | 'referral' | null = null;
  configuredCpm = 5;

  constructor(
    private localStorageService: LocalStorageService,
    private currencyService: CurrencyService,
    private cpmService: CpmService,
    private adminDashboardService: AdminDashboardService,
    private dashboardWidgetsService: DashboardWidgetsService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      if (this.chart) {
        this.chart.update();
      }
    });

    // CPM is a global config; keep it updated for all users.
    this.cpmSubscription = this.cpmService.getCpm$().subscribe((val) => {
      this.configuredCpm = val;
    });

    this.loadAdminDashboard();
    this.loadDashboardWidgets();
  }

  isAdmin(): boolean {
    const user = this.localStorageService.getLogger();
    return user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'super_admin';
  }

  private loadDashboardWidgets(): void {
    this.widgetsLoading = true;
    forkJoin({
      activity: this.dashboardWidgetsService.getRecentActivity(),
      top: this.dashboardWidgetsService.getTopLinks(),
    }).subscribe({
      next: ({ activity, top }) => {
        if (activity.status === 'success' && activity.data?.items) {
          this.recentActivities = activity.data.items;
          this.activityScope = activity.data.scope;
        }
        if (top.status === 'success' && top.data?.items) {
          this.topPerformingLinks = top.data.items;
          this.topLinksScope = top.data.scope;
        }
        this.widgetsLoaded = true;
        this.widgetsLoading = false;
      },
      error: (err) => {
        console.error('[Dashboard] widgets error', err);
        this.widgetsLoaded = true;
        this.widgetsLoading = false;
      },
    });
  }

  formatRelativeTime(iso: string): string {
    const t = new Date(iso).getTime();
    if (isNaN(t)) {
      return '';
    }
    const sec = Math.floor((Date.now() - t) / 1000);
    if (sec < 45) {
      return 'Just now';
    }
    const min = Math.floor(sec / 60);
    if (min < 60) {
      return `${min} minute${min === 1 ? '' : 's'} ago`;
    }
    const h = Math.floor(min / 60);
    if (h < 24) {
      return `${h} hour${h === 1 ? '' : 's'} ago`;
    }
    const d = Math.floor(h / 24);
    if (d < 14) {
      return `${d} day${d === 1 ? '' : 's'} ago`;
    }
    return new Date(iso).toLocaleString();
  }

  activityIcon(type: DashboardRecentActivityItem['type']): string {
    switch (type) {
      case 'link_created':
        return '🔗';
      case 'user_registered':
        return '👤';
      case 'link_click':
        return '👁️';
      case 'referral_bonus':
        return '💰';
      default:
        return '•';
    }
  }

  truncateUrl(url: string | undefined, maxLen: number): string {
    if (!url) {
      return '';
    }
    if (url.length <= maxLen) {
      return url;
    }
    const half = Math.floor((maxLen - 3) / 2);
    return `${url.slice(0, half)}…${url.slice(-half)}`;
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
    if (this.cpmSubscription) {
      this.cpmSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  displayCpmToday(): number {
    return this.isAdmin() ? this.todaysCpmCount : this.configuredCpm;
  }

  displayCpmTotal(): number {
    return this.isAdmin() ? this.totalCpmCount : this.configuredCpm;
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
