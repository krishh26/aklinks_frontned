import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../../services/theme.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;

  profileForm = {
    username: 'Time17',
    email: 'time17@example.com',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    website: '',
    location: '',
    withdrawalMethod: '',
    withdrawalAccountDetails: ''
  };

  selectedFile: File | null = null;
  profileImageUrl: string | ArrayBuffer | null = null;

  withdrawalMethods = [
    { method: 'Paytm', minAmount: '$1.0000' },
    { method: 'UPI-Id', minAmount: '$1.0000' },
    { method: 'Phone Pe', minAmount: '$1.0000' },
    { method: 'GPay - India', minAmount: '$1.0000' },
    { method: 'Payeer', minAmount: '$5.0000' },
    { method: 'PayPal', minAmount: '$5.0000' },
    { method: 'EasyPaisa - Pakistan', minAmount: '$5.0000' },
    { method: 'Jazzcash - Pakistan', minAmount: '$5.0000' },
    { method: 'Nepal - eSewa', minAmount: '$5.0000' },
    { method: 'Bkash - Bangladesh', minAmount: '$5.0000' },
    { method: 'Nagad - Bangladesh', minAmount: '$5.0000' },
    { method: 'Faucet Pay', minAmount: '$5.0000' },
    { method: 'Google Gift Card', minAmount: '$5.0000' },
    { method: 'Amazon Gift Card', minAmount: '$5.0000' },
    { method: 'Airtm', minAmount: '$5.0000' },
    { method: 'Crypto USDT, BTC, XRP, ETH', minAmount: '$10.0000' },
    { method: 'All Bank Account', minAmount: '$10.0000' },
    { method: 'Vodafone Cash', minAmount: '$10.0000' },
    { method: 'Orange Money', minAmount: '$10.0000' },
    { method: 'Perfect Money', minAmount: '$10.0000' }
  ];

  selectedWithdrawalMethod: string = '';
  withdrawalAccountDetails: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    // Load user profile data (you can fetch from API/localStorage)
    this.loadProfileData();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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

  loadProfileData(): void {
    // Load profile data from localStorage or API
    const savedProfile = this.localStorageService.getItem('userProfile');
    if (savedProfile) {
      this.profileForm = { ...this.profileForm, ...savedProfile };
      this.selectedWithdrawalMethod = savedProfile.withdrawalMethod || '';
      this.withdrawalAccountDetails = savedProfile.withdrawalAccountDetails || '';
    }
    
    const savedImage = this.localStorageService.getItem('profileImage');
    if (savedImage) {
      this.profileImageUrl = savedImage;
    }
  }

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

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result || null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.profileForm.username || !this.profileForm.email) {
      alert('Please fill in required fields (Username and Email).');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.profileForm.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Save profile data
    this.profileForm.withdrawalMethod = this.selectedWithdrawalMethod;
    this.profileForm.withdrawalAccountDetails = this.withdrawalAccountDetails;
    this.localStorageService.setItem('userProfile', this.profileForm);
    if (this.profileImageUrl) {
      this.localStorageService.setItem('profileImage', this.profileImageUrl);
    }

    // Handle profile update here
    console.log('Profile update requested:', this.profileForm);
    
    // You can add API call here to update the profile
    alert('Profile updated successfully!');
  }

  onCancel(): void {
    // Reset to original values
    this.loadProfileData();
  }

  getAccountPlaceholder(): string {
    if (!this.selectedWithdrawalMethod) {
      return 'Select a withdrawal method first';
    }
    
    const method = this.selectedWithdrawalMethod.toLowerCase();
    if (method.includes('upi') || method.includes('paytm') || method.includes('phone') || method.includes('gpay')) {
      return 'Enter your UPI ID or Phone Number';
    } else if (method.includes('paypal') || method.includes('payeer') || method.includes('perfect money')) {
      return 'Enter your Email Address';
    } else if (method.includes('crypto') || method.includes('usdt') || method.includes('btc') || method.includes('eth') || method.includes('xrp')) {
      return 'Enter your Wallet Address';
    } else if (method.includes('bank')) {
      return 'Enter your Bank Account Number';
    } else if (method.includes('gift card')) {
      return 'Enter your Email Address';
    } else {
      return 'Enter your Account ID or Phone Number';
    }
  }
}

