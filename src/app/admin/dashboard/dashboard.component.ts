import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { CurrencyService } from '../../services/currency.service';
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

  // Static data for cards
  todaysEarning = 0.83;
  todaysCpmCount = 6.95;
  todaysView = 120;
  totalReferral = 4.37;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private currencyService: CurrencyService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      // Component will re-render when currency changes
      if (this.chart) {
        this.chart.update();
      }
    });
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

