import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

interface Withdrawal {
  id: string;
  userId: string;
  username: string;
  email: string;
  amount: number;
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  date: string;
  processedDate?: string;
  transactionId?: string;
  accountDetails: string;
  notes?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  pendingAmount: number;
  totalEarnings: number;
  joinDate: string;
  lastActivity: string;
}

@Component({
  selector: 'app-withdraws',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.scss']
})
export class WithdrawsComponent implements OnInit {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false;
  
  // Admin data
  adminStats = {
    totalWithdrawals: 1250,
    pendingWithdrawals: 15,
    completedWithdrawals: 1200,
    totalAmount: 125000,
    pendingAmount: 2500
  };
  
  // Withdrawal management
  selectedWithdrawal: Withdrawal | null = null;
  showWithdrawalModal = false;
  showUserModal = false;
  
  // Filters and search
  searchTerm = '';
  statusFilter = 'all';
  methodFilter = 'all';
  dateFilter = 'all';
  
  // Withdrawal form
  withdrawalForm = {
    status: '',
    transactionId: '',
    notes: ''
  };
  
  // Sample data
  withdrawals: Withdrawal[] = [
    {
      id: 'WD001',
      userId: 'USR001',
      username: 'john_doe',
      email: 'john@example.com',
      amount: 50.00,
      method: 'PayPal',
      status: 'pending',
      date: '2024-01-15',
      accountDetails: 'john@example.com',
      notes: 'Regular withdrawal request'
    },
    {
      id: 'WD002',
      userId: 'USR002',
      username: 'sarah_smith',
      email: 'sarah@example.com',
      amount: 75.00,
      method: 'Bank Transfer',
      status: 'processing',
      date: '2024-01-20',
      accountDetails: 'Account: 1234567890, IFSC: HDFC0001234',
      notes: 'High priority withdrawal'
    },
    {
      id: 'WD003',
      userId: 'USR003',
      username: 'mike_wilson',
      email: 'mike@example.com',
      amount: 30.00,
      method: 'USDT',
      status: 'completed',
      date: '2024-01-22',
      processedDate: '2024-01-23',
      transactionId: 'TXN123456789',
      accountDetails: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      notes: 'Crypto withdrawal processed'
    },
    {
      id: 'WD004',
      userId: 'USR004',
      username: 'emily_jones',
      email: 'emily@example.com',
      amount: 100.00,
      method: 'PayPal',
      status: 'rejected',
      date: '2024-01-10',
      accountDetails: 'emily@example.com',
      notes: 'Invalid account details provided'
    },
    {
      id: 'WD005',
      userId: 'USR005',
      username: 'alex_brown',
      email: 'alex@example.com',
      amount: 25.00,
      method: 'UPI',
      status: 'pending',
      date: '2024-01-25',
      accountDetails: 'alex@paytm',
      notes: 'UPI withdrawal request'
    }
  ];
  
  users: User[] = [
    {
      id: 'USR001',
      username: 'john_doe',
      email: 'john@example.com',
      balance: 125.50,
      pendingAmount: 25.00,
      totalEarnings: 2500.00,
      joinDate: '2023-06-15',
      lastActivity: '2024-01-25'
    },
    {
      id: 'USR002',
      username: 'sarah_smith',
      email: 'sarah@example.com',
      balance: 200.75,
      pendingAmount: 75.00,
      totalEarnings: 3200.00,
      joinDate: '2023-08-20',
      lastActivity: '2024-01-24'
    }
  ];
  
  // Payment methods
  paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '💳' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'usdt', name: 'USDT (Tether)', icon: '₿' },
    { id: 'btc', name: 'Bitcoin', icon: '₿' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'gpay', name: 'Google Pay', icon: '📱' }
  ];
  
  // UI state
  activeTab = 'withdrawals';
  showFilters = false;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  // Filter and search methods
  get filteredWithdrawals(): Withdrawal[] {
    return this.withdrawals.filter(withdrawal => {
      const matchesSearch = !this.searchTerm || 
        withdrawal.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        withdrawal.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        withdrawal.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || withdrawal.status === this.statusFilter;
      const matchesMethod = this.methodFilter === 'all' || withdrawal.method === this.methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }

  onSearch() {
    // Search is handled by the filteredWithdrawals getter
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.methodFilter = 'all';
    this.dateFilter = 'all';
  }

  // Withdrawal management
  viewWithdrawal(withdrawal: Withdrawal) {
    this.selectedWithdrawal = withdrawal;
    this.withdrawalForm = {
      status: withdrawal.status,
      transactionId: withdrawal.transactionId || '',
      notes: withdrawal.notes || ''
    };
    this.showWithdrawalModal = true;
  }

  updateWithdrawal() {
    if (this.selectedWithdrawal) {
      this.selectedWithdrawal.status = this.withdrawalForm.status as any;
      this.selectedWithdrawal.transactionId = this.withdrawalForm.transactionId;
      this.selectedWithdrawal.notes = this.withdrawalForm.notes;
      
      if (this.withdrawalForm.status === 'completed') {
        this.selectedWithdrawal.processedDate = new Date().toISOString().split('T')[0];
      }
      
      this.showWithdrawalModal = false;
      this.selectedWithdrawal = null;
    }
  }

  viewUser(user: User) {
    this.showUserModal = true;
  }

  // Utility methods
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getWithdrawalCount(status: string): number {
    return this.withdrawals.filter(w => w.status === status).length;
  }

  getTotalAmount(status: string): number {
    return this.withdrawals
      .filter(w => w.status === status)
      .reduce((sum, w) => sum + w.amount, 0);
  }

  // Theme methods
  getThemeIcon(): string {
    switch (this.currentTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'blue':
        return '🌊';
      default:
        return '☀️';
    }
  }

  toggleThemeDropdown(): void {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.isThemeDropdownOpen = false;
  }

  // Sidebar methods
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  logout(): void {
    // Logout is handled by the sidebar component
  }
}
