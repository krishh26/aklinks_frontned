import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SupportService } from '../../services/support/support.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;

  contactForm = {
    name: '',
    subject: '',
    email: '',
    message: '',
    consent: false
  };

  isSubmitting = false;
  submitError: string | null = null;
  submitSuccess = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private supportService: SupportService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    // Close sidebar on mobile (<= 1024px), open on desktop (> 1024px)
    if (typeof window !== 'undefined') {
      this.isSidebarOpen = window.innerWidth > 1024;
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

  get isFormValid(): boolean {
    // Check if all fields are filled (not empty)
    const nameValid = this.contactForm.name.trim().length > 0;
    const subjectValid = this.contactForm.subject.trim().length > 0;
    const emailValid = this.contactForm.email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contactForm.email.trim());
    const messageValid = this.contactForm.message.trim().length > 0;
    const consentValid = this.contactForm.consent;

    return nameValid && subjectValid && emailValid && messageValid && consentValid;
  }

  onSubmit(form: NgForm) {
    // Check if form is valid
    if (form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      this.submitError = 'Please fill in all required fields correctly.';
      return;
    }

    // Check if consent is checked
    if (!this.contactForm.consent) {
      this.submitError = 'Please accept the consent to proceed.';
      return;
    }

    // Check if all fields are filled
    if (!this.contactForm.name || !this.contactForm.subject || !this.contactForm.email || !this.contactForm.message) {
      this.submitError = 'Please fill in all required fields.';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactForm.email)) {
      this.submitError = 'Please enter a valid email address.';
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    this.submitSuccess = false;

    const payload = {
      name: this.contactForm.name.trim(),
      subject: this.contactForm.subject.trim(),
      email: this.contactForm.email.trim(),
      message: this.contactForm.message.trim(),
      consent: this.contactForm.consent
    };

    this.supportService.submitSupportRequest(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        console.log('Support request submitted successfully:', response);
        
        // Reset form after successful submission
        this.contactForm = {
          name: '',
          subject: '',
          email: '',
          message: '',
          consent: false
        };
        form.resetForm();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error submitting support request:', error);
        this.submitError = error.error?.message || error.message || 'Failed to submit support request. Please try again.';
      }
    });
  }
}







