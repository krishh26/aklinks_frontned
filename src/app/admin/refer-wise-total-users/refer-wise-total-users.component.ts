import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { CurrencyService } from '../../services/currency.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs';

interface ReferredUser {
  id: string;
  username: string;
  email: string;
  referredBy: string;
  referrerUsername: string;
  referrerEmail: string;
  referralCode: string;
  joinDate: string;
  status: 'active' | 'inactive';
  totalEarnings: number;
  totalReferrals: number;
  lastActivity: string;
}

@Component({
  selector: 'app-refer-wise-total-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './refer-wise-total-users.component.html',
  styleUrls: ['./refer-wise-total-users.component.scss']
})
export class ReferWiseTotalUsersComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  
  // Stats data
  referralStats = {
    totalReferredUsers: 1250,
    activeReferredUsers: 850,
    totalReferrers: 320,
    totalReferralEarnings: 12500
  };
  
  // Filters and search
  searchTerm = '';
  statusFilter = 'all';
  referrerFilter = 'all';
  dateFilter = 'all';
  
  // Sample referred users data
  referredUsers: ReferredUser[] = [
    {
      id: 'USR001',
      username: 'john_doe',
      email: 'john@example.com',
      referredBy: 'REF001',
      referrerUsername: 'alice_smith',
      referrerEmail: 'alice@example.com',
      referralCode: 'ALICE2024',
      joinDate: '2024-01-15',
      status: 'active',
      totalEarnings: 1250.50,
      totalReferrals: 5,
      lastActivity: '2024-01-25'
    },
    {
      id: 'USR002',
      username: 'sarah_wilson',
      email: 'sarah@example.com',
      referredBy: 'REF001',
      referrerUsername: 'alice_smith',
      referrerEmail: 'alice@example.com',
      referralCode: 'ALICE2024',
      joinDate: '2024-01-18',
      status: 'active',
      totalEarnings: 980.75,
      totalReferrals: 3,
      lastActivity: '2024-01-24'
    },
    {
      id: 'USR003',
      username: 'mike_jones',
      email: 'mike@example.com',
      referredBy: 'REF002',
      referrerUsername: 'bob_martin',
      referrerEmail: 'bob@example.com',
      referralCode: 'BOB2024',
      joinDate: '2024-01-20',
      status: 'active',
      totalEarnings: 1650.25,
      totalReferrals: 8,
      lastActivity: '2024-01-26'
    },
    {
      id: 'USR004',
      username: 'emily_brown',
      email: 'emily@example.com',
      referredBy: 'REF003',
      referrerUsername: 'charlie_davis',
      referrerEmail: 'charlie@example.com',
      referralCode: 'CHARLIE2024',
      joinDate: '2024-01-12',
      status: 'inactive',
      totalEarnings: 650.00,
      totalReferrals: 2,
      lastActivity: '2024-01-20'
    },
    {
      id: 'USR005',
      username: 'alex_taylor',
      email: 'alex@example.com',
      referredBy: 'REF001',
      referrerUsername: 'alice_smith',
      referrerEmail: 'alice@example.com',
      referralCode: 'ALICE2024',
      joinDate: '2024-01-22',
      status: 'active',
      totalEarnings: 890.50,
      totalReferrals: 4,
      lastActivity: '2024-01-23'
    },
    {
      id: 'USR006',
      username: 'lisa_anderson',
      email: 'lisa@example.com',
      referredBy: 'REF002',
      referrerUsername: 'bob_martin',
      referrerEmail: 'bob@example.com',
      referralCode: 'BOB2024',
      joinDate: '2024-01-19',
      status: 'active',
      totalEarnings: 1120.00,
      totalReferrals: 6,
      lastActivity: '2024-01-25'
    },
    {
      id: 'USR007',
      username: 'david_lee',
      email: 'david@example.com',
      referredBy: 'REF004',
      referrerUsername: 'diana_wilson',
      referrerEmail: 'diana@example.com',
      referralCode: 'DIANA2024',
      joinDate: '2024-01-21',
      status: 'active',
      totalEarnings: 750.25,
      totalReferrals: 1,
      lastActivity: '2024-01-24'
    },
    {
      id: 'USR008',
      username: 'jennifer_white',
      email: 'jennifer@example.com',
      referredBy: 'REF001',
      referrerUsername: 'alice_smith',
      referrerEmail: 'alice@example.com',
      referralCode: 'ALICE2024',
      joinDate: '2024-01-16',
      status: 'active',
      totalEarnings: 1450.75,
      totalReferrals: 7,
      lastActivity: '2024-01-26'
    }
  ];
  
  // Get unique referrers for filter
  get uniqueReferrers(): string[] {
    const referrers = [...new Set(this.referredUsers.map(user => user.referrerUsername))];
    return referrers.sort();
  }
  
  // UI state
  selectedUser: ReferredUser | null = null;
  showUserModal = false;

  private currencySubscription?: Subscription;

  constructor(
    private router: Router,
    private currencyService: CurrencyService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) {
    this.checkScreenSize();
    this.checkAdminRole();
  }

  ngOnInit(): void {
    this.checkAdminRole();
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      // Component will re-render when currency changes
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
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
  get filteredUsers(): ReferredUser[] {
    return this.referredUsers.filter(user => {
      const matchesSearch = !this.searchTerm || 
        user.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.referrerUsername.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.referrerEmail.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || user.status === this.statusFilter;
      const matchesReferrer = this.referrerFilter === 'all' || user.referrerUsername === this.referrerFilter;
      
      return matchesSearch && matchesStatus && matchesReferrer;
    });
  }

  onSearch() {
    // Search is handled by the filteredUsers getter
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.referrerFilter = 'all';
    this.dateFilter = 'all';
  }

  // User management
  viewUser(user: ReferredUser) {
    this.selectedUser = user;
    this.showUserModal = true;
  }

  // Utility methods
  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
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
}
