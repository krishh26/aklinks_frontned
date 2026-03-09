import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CurrencyService } from '../../services/currency.service';
import { AdsterraService } from '../../services/adsterra/adsterra.service';
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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  isSidebarOpen = false; // Will be set based on screen size
  private currencySubscription?: Subscription;
  private chart: Chart | null = null;

  // Card data - uses Adsterra when available, else static fallback
  todaysEarning = 0.83;
  todaysCpmCount = 6.95;
  todaysView = 120;
  todaysReferral = 0.31;

  totalEarning = 125.43;
  totalCpmCount = 689.25;
  totalView = 4523;
  totalReferral = 48.92;

  adsterraStatsRows: Array<{ date: string; views: number; cpm: number; earnings: number; referrals: number }> = [];
  adsterraStatsLoaded = false;
  isAdsterraLoading = false;

  activeCard: 'earning' | 'cpm' | 'views' | 'referral' | null = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private currencyService: CurrencyService,
    private adsterraService: AdsterraService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      if (this.chart) {
        this.chart.update();
      }
    });
    this.loadAdsterraStats();
  }

  private isAdmin(): boolean {
    const user = this.localStorageService.getLogger();
    return user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'super_admin';
  }

  private loadAdsterraStats(): void {
    if (!this.isAdmin()) return;
    this.isAdsterraLoading = true;
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const startDate = weekAgo.toISOString().split('T')[0];
    const finishDate = today.toISOString().split('T')[0];

    this.adsterraService.getStatistics({
      start_date: startDate,
      finish_date: finishDate,
      group_by: 'date'
    }).subscribe({
      next: (res) => {
        if (res.status === 'success' && res.data) {
          const items = Array.isArray(res.data) ? res.data : (res.data?.items || res.data?.stats || []);
          this.processAdsterraStats(items);
          this.updateCardsFromAdsterra(items);
          this.updateChartFromAdsterra(items);
        }
        this.adsterraStatsLoaded = true;
        this.isAdsterraLoading = false;
      },
      error: () => {
        this.adsterraStatsLoaded = true;
        this.isAdsterraLoading = false;
      }
    });
  }

  private processAdsterraStats(items: any[]): void {
    const byDate: Record<string, { views: number; cpm: number; earnings: number; referrals: number }> = {};
    items.forEach((row: any) => {
      const d = row.date || row.Date || row.day;
      if (!d) return;
      const key = String(d).split('T')[0];
      if (!byDate[key]) byDate[key] = { views: 0, cpm: 0, earnings: 0, referrals: 0 };
      byDate[key].views += Number(row.impressions ?? row.views ?? row.Impressions ?? 0);
      byDate[key].cpm = Number(row.cpm ?? row.CPM ?? 0) || byDate[key].cpm;
      byDate[key].earnings += Number(row.revenue ?? row.Revenue ?? row.earnings ?? 0);
      byDate[key].referrals = Number(row.referrals ?? 0);
    });
    const sorted = Object.entries(byDate).sort((a, b) => b[0].localeCompare(a[0]));
    this.adsterraStatsRows = sorted.slice(0, 11).map(([date, v]) => ({
      date,
      views: v.views,
      cpm: v.cpm,
      earnings: v.earnings,
      referrals: v.referrals
    }));
  }

  private updateCardsFromAdsterra(items: any[]): void {
    const todayStr = new Date().toISOString().split('T')[0];
    let todayRevenue = 0;
    let todayImpressions = 0;
    let todayCpm = 0;
    let totalRevenue = 0;
    let totalImpressions = 0;
    let totalCpmSum = 0;
    let cpmCount = 0;

    items.forEach((row: any) => {
      const d = String(row.date || row.Date || row.day || '').split('T')[0];
      const rev = Number(row.revenue ?? row.Revenue ?? 0);
      const imp = Number(row.impressions ?? row.Impressions ?? row.views ?? 0);
      const cpm = Number(row.cpm ?? row.CPM ?? 0);

      totalRevenue += rev;
      totalImpressions += imp;
      if (cpm > 0) {
        totalCpmSum += cpm;
        cpmCount++;
      }
      if (d === todayStr) {
        todayRevenue += rev;
        todayImpressions += imp;
        if (cpm > 0) todayCpm = cpm;
      }
    });

    if (totalRevenue > 0 || totalImpressions > 0) {
      this.todaysEarning = todayRevenue || this.todaysEarning;
      this.todaysView = todayImpressions || this.todaysView;
      this.todaysCpmCount = todayCpm || (cpmCount > 0 ? totalCpmSum / cpmCount : this.todaysCpmCount);
      this.totalEarning = totalRevenue || this.totalEarning;
      this.totalView = totalImpressions || this.totalView;
      this.totalCpmCount = cpmCount > 0 ? totalCpmSum / cpmCount : this.totalCpmCount;
    }
  }

  private updateChartFromAdsterra(items: any[]): void {
    const byDate: Record<string, { views: number; earnings: number }> = {};
    items.forEach((row: any) => {
      const d = String(row.date || row.Date || row.day || '').split('T')[0];
      if (!byDate[d]) byDate[d] = { views: 0, earnings: 0 };
      byDate[d].views += Number(row.impressions ?? row.Impressions ?? row.views ?? 0);
      byDate[d].earnings += Number(row.revenue ?? row.Revenue ?? 0);
    });
    const sorted = Object.entries(byDate).sort((a, b) => a[0].localeCompare(b[0]));
    if (sorted.length > 0 && this.chart) {
      this.chart.data.labels = sorted.map(([d]) => d);
      (this.chart.data.datasets[0] as any).data = sorted.map(([, v]) => v.views);
      (this.chart.data.datasets[1] as any).data = sorted.map(([, v]) => v.earnings);
      this.chart.update();
    }
  }

  getStatsTableRows(): Array<{ date: string; views: number; cpm: number; earnings: number; referrals: number }> {
    if (this.adsterraStatsLoaded && this.adsterraStatsRows.length > 0) {
      return this.adsterraStatsRows;
    }
    return [
      { date: '2025-10-11', views: 120, cpm: 6.95, earnings: 0.83, referrals: 0.31 },
      { date: '2025-10-10', views: 54, cpm: 6.67, earnings: 0.36, referrals: 0.48 },
      { date: '2025-10-09', views: 53, cpm: 7.58, earnings: 0.40, referrals: 0.41 },
      { date: '2025-10-08', views: 89, cpm: 6.25, earnings: 0.56, referrals: 0.38 },
      { date: '2025-10-07', views: 76, cpm: 7.12, earnings: 0.54, referrals: 0.29 },
      { date: '2025-10-06', views: 95, cpm: 6.89, earnings: 0.65, referrals: 0.42 },
      { date: '2025-10-05', views: 67, cpm: 7.34, earnings: 0.49, referrals: 0.35 },
      { date: '2025-10-04', views: 82, cpm: 6.78, earnings: 0.56, referrals: 0.33 },
      { date: '2025-10-03', views: 71, cpm: 7.01, earnings: 0.50, referrals: 0.28 },
      { date: '2025-10-02', views: 58, cpm: 6.45, earnings: 0.37, referrals: 0.31 },
      { date: '2025-10-01', views: 63, cpm: 6.95, earnings: 0.44, referrals: 0.26 }
    ];
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.initChart();
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

    // Static data for the last 7 days
    const dates = ['2025-10-05', '2025-10-06', '2025-10-07', '2025-10-08', '2025-10-09', '2025-10-10', '2025-10-11'];
    const views = [67, 95, 76, 89, 53, 54, 120];
    const earnings = [0.49, 0.65, 0.54, 0.56, 0.40, 0.36, 0.83];

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Total Views',
            data: views,
            borderColor: 'rgb(102, 126, 234)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y',
          },
          {
            label: 'Earnings',
            data: earnings,
            borderColor: 'rgb(118, 75, 162)',
            backgroundColor: 'rgba(118, 75, 162, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1',
          }
        ]
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
                  // Format earnings with currency
                  const value = context.parsed.y ?? 0;
                  return `${context.dataset.label}: ${this.formatCurrency(value)}`;
                }
                const value = context.parsed.y ?? 0;
                return `${context.dataset.label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Views'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Earnings (USD)'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        }
      }
    });
  }

  formatCurrency(usdAmount: number): string {
    return this.currencyService.format(usdAmount);
  }

  /**
   * Basic numeric validation to avoid showing invalid values in the UI.
   */
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

  /**
   * Toggle flip state for a given card.
   * Only one card can be flipped at a time; clicking again unflips it.
   */
  toggleCard(card: 'earning' | 'cpm' | 'views' | 'referral'): void {
    this.activeCard = this.activeCard === card ? null : card;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    // Close sidebar on mobile (<= 1024px), open on desktop (> 1024px)
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

