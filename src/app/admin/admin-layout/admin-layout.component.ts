import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true; // Sidebar is open by default

  constructor(private themeService: ThemeService) {}

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
}
