import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { CurrencyService } from '../../services/currency.service';
import { Subscription } from 'rxjs';

interface Referral {
  id: string;
  username: string;
  email: string;
  referralCode: string;
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  joinDate: string;
  lastActivity: string;
  status: 'active' | 'inactive';
}

interface ReferralEarning {
  id: string;
  referralId: string;
  username: string;
  referredBy: string;
  earningAmount: number;
  commissionRate: number;
  status: 'pending' | 'paid' | 'cancelled';
  date: string;
  paidDate?: string;
  transactionId?: string;
}

@Component({
  selector: 'app-referral-earning',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './referral-earning.component.html',
  styleUrls: ['./referral-earning.component.scss']
})
export class ReferralEarningComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  
  // Stats data
  referralStats = {
    totalReferrals: 1250,
    activeReferrals: 850,
    totalEarnings: 12500,
    pendingEarnings: 2500,
    paidEarnings: 10000,
    totalUsers: 3200
  };
  
  // Filters and search
  searchTerm = '';
  statusFilter = 'all';
  dateFilter = 'all';
  
  // Sample referral data
  referrals: Referral[] = [
    {
      id: 'REF001',
      username: 'john_doe',
      email: 'john@example.com',
      referralCode: 'JOHN2024',
      totalReferrals: 45,
      activeReferrals: 32,
      totalEarnings: 1250.50,
      pendingEarnings: 125.00,
      paidEarnings: 1125.50,
      joinDate: '2023-06-15',
      lastActivity: '2024-01-25',
      status: 'active'
    },
    {
      id: 'REF002',
      username: 'sarah_smith',
      email: 'sarah@example.com',
      referralCode: 'SARAH2024',
      totalReferrals: 38,
      activeReferrals: 28,
      totalEarnings: 980.75,
      pendingEarnings: 95.00,
      paidEarnings: 885.75,
      joinDate: '2023-08-20',
      lastActivity: '2024-01-24',
      status: 'active'
    },
    {
      id: 'REF003',
      username: 'mike_wilson',
      email: 'mike@example.com',
      referralCode: 'MIKE2024',
      totalReferrals: 52,
      activeReferrals: 40,
      totalEarnings: 1650.25,
      pendingEarnings: 200.00,
      paidEarnings: 1450.25,
      joinDate: '2023-05-10',
      lastActivity: '2024-01-26',
      status: 'active'
    },
    {
      id: 'REF004',
      username: 'emily_jones',
      email: 'emily@example.com',
      referralCode: 'EMILY2024',
      totalReferrals: 28,
      activeReferrals: 18,
      totalEarnings: 650.00,
      pendingEarnings: 75.00,
      paidEarnings: 575.00,
      joinDate: '2023-09-12',
      lastActivity: '2024-01-20',
      status: 'inactive'
    },
    {
      id: 'REF005',
      username: 'alex_brown',
      email: 'alex@example.com',
      referralCode: 'ALEX2024',
      totalReferrals: 35,
      activeReferrals: 25,
      totalEarnings: 890.50,
      pendingEarnings: 110.00,
      paidEarnings: 780.50,
      joinDate: '2023-07-08',
      lastActivity: '2024-01-23',
      status: 'active'
    }
  ];
  
  // Sample earnings data
  earnings: ReferralEarning[] = [
    {
      id: 'ERN001',
      referralId: 'REF001',
      username: 'john_doe',
      referredBy: 'user123',
      earningAmount: 25.50,
      commissionRate: 10,
      status: 'paid',
      date: '2024-01-15',
      paidDate: '2024-01-16',
      transactionId: 'TXN123456789'
    },
    {
      id: 'ERN002',
      referralId: 'REF002',
      username: 'sarah_smith',
      referredBy: 'user456',
      earningAmount: 18.75,
      commissionRate: 10,
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: 'ERN003',
      referralId: 'REF003',
      username: 'mike_wilson',
      referredBy: 'user789',
      earningAmount: 32.00,
      commissionRate: 10,
      status: 'paid',
      date: '2024-01-18',
      paidDate: '2024-01-19',
      transactionId: 'TXN987654321'
    },
    {
      id: 'ERN004',
      referralId: 'REF001',
      username: 'john_doe',
      referredBy: 'user321',
      earningAmount: 15.25,
      commissionRate: 10,
      status: 'pending',
      date: '2024-01-22'
    },
    {
      id: 'ERN005',
      referralId: 'REF005',
      username: 'alex_brown',
      referredBy: 'user654',
      earningAmount: 22.50,
      commissionRate: 10,
      status: 'paid',
      date: '2024-01-19',
      paidDate: '2024-01-20',
      transactionId: 'TXN456789123'
    }
  ];
  
  // UI state
  activeTab = 'referrals';
  showFilters = false;
  selectedReferral: Referral | null = null;
  showReferralModal = false;
  
  // Referral code link (static)
  referralCode = 'AKLINKS2024';
  referralLink = 'https://aklinks.com/signup?ref=AKLINKS2024';
  copyCodeSuccess = false;
  copyLinkSuccess = false;

  private currencySubscription?: Subscription;

  constructor(
    private router: Router,
    private currencyService: CurrencyService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      // Component will re-render when currency changes
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
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

  // Filter and search methods
  get filteredReferrals(): Referral[] {
    return this.referrals.filter(referral => {
      const matchesSearch = !this.searchTerm || 
        referral.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        referral.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        referral.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        referral.referralCode.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || referral.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  get filteredEarnings(): ReferralEarning[] {
    return this.earnings.filter(earning => {
      const matchesSearch = !this.searchTerm || 
        earning.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        earning.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        earning.referredBy.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || earning.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  onSearch() {
    // Search is handled by the filtered getters
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.dateFilter = 'all';
  }

  // Referral management
  viewReferral(referral: Referral) {
    this.selectedReferral = referral;
    this.showReferralModal = true;
  }

  // Utility methods
  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  }

  formatCurrency(amount: number): string {
    return this.currencyService.format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Sidebar methods
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // Copy referral link to clipboard
  copyReferralLink(): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.referralLink).then(() => {
        this.copyLinkSuccess = true;
        setTimeout(() => {
          this.copyLinkSuccess = false;
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        this.fallbackCopyTextToClipboard(this.referralLink, 'link');
      });
    } else {
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(this.referralLink, 'link');
    }
  }

  // Fallback copy method
  private fallbackCopyTextToClipboard(text: string, type: 'code' | 'link' = 'code'): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (type === 'code') {
        this.copyCodeSuccess = true;
        setTimeout(() => {
          this.copyCodeSuccess = false;
        }, 2000);
      } else {
        this.copyLinkSuccess = true;
        setTimeout(() => {
          this.copyLinkSuccess = false;
        }, 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  // Copy referral code to clipboard
  copyReferralCode(): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.referralCode).then(() => {
        this.copyCodeSuccess = true;
        setTimeout(() => {
          this.copyCodeSuccess = false;
        }, 2000);
      }).catch(() => {
        this.fallbackCopyTextToClipboard(this.referralCode, 'code');
      });
    } else {
      this.fallbackCopyTextToClipboard(this.referralCode, 'code');
    }
  }
}
