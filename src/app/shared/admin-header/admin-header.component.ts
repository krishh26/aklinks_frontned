import { Component, OnInit, OnDestroy, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="admin-header">
      <div class="header-left">
        <button class="sidebar-toggle-header-btn" *ngIf="!isSidebarOpen" (click)="onSidebarToggle()" title="Open Sidebar">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <ng-content></ng-content>
      </div>
      
      <div class="header-right">
        <div class="theme-switcher-wrapper">
          <button class="header-icon theme-toggle" (click)="toggleThemeDropdown()">
            <span>{{ getThemeIcon() }}</span>
          </button>
          <div class="theme-dropdown" [class.active]="isThemeDropdownOpen">
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'light'"
              (click)="selectTheme('light')">
              <span class="theme-icon">☀️</span>
              <span class="theme-label">Light</span>
            </button>
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'dark'"
              (click)="selectTheme('dark')">
              <span class="theme-icon">🌙</span>
              <span class="theme-label">Dark</span>
            </button>
            <button 
              class="theme-option" 
              [class.active]="currentTheme === 'blue'"
              (click)="selectTheme('blue')">
              <span class="theme-icon">🌊</span>
              <span class="theme-label">Blue</span>
            </button>
          </div>
        </div>
        <button class="header-icon notifications">
          <span>🔔</span>
          <span class="notification-badge">3</span>
        </button>
        <button class="header-icon profile">
          <span>👤</span>
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  @Input() isSidebarOpen: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

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

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }
}
