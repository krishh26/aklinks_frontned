import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true; // Sidebar is open by default

  contactForm = {
    name: '',
    subject: '',
    email: '',
    message: '',
    consent: false
  };

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
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

  onSubmit() {
    if (this.contactForm.consent && this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      // Handle form submission here
      console.log('Form submitted:', this.contactForm);
      // You can add API call here to submit the form
      alert('Thank you for contacting us! We will get back to you soon.');
      
      // Reset form
      this.contactForm = {
        name: '',
        subject: '',
        email: '',
        message: '',
        consent: false
      };
    } else {
      alert('Please fill in all required fields and accept the consent.');
    }
  }
}




