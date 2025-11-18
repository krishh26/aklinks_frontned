import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

interface TrafficSource {
  id: number;
  url: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

@Component({
  selector: 'app-traffic-source',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './traffic-source.component.html',
  styleUrls: ['./traffic-source.component.scss']
})
export class TrafficSourceComponent implements OnInit {
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true; // Sidebar is open by default
  isUserMenuOpen = true; // Card is open by default
  isAddSourceFormOpen = false;

  trafficSources: TrafficSource[] = [
    { 
      id: 1, 
      url: 'https://example.com/traffic-source', 
      status: 'approved', 
      date: '31-8-2025' 
    }
  ];

  newSource = {
    sourceType: '',
    url: ''
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

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    // Implement logout functionality
    this.localStorageService.clearStorage();
    
    // Redirect to login page
    this.router.navigate(['/auth/login']);
  }

  toggleAddSourceForm(): void {
    this.isAddSourceFormOpen = !this.isAddSourceFormOpen;
    // Reset form when closing
    if (!this.isAddSourceFormOpen) {
      this.newSource = {
        sourceType: '',
        url: ''
      };
    }
  }

  onSubmit(): void {
    if (this.newSource.url && this.newSource.sourceType) {
      // Format date as DD-MM-YYYY
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      // Create new traffic source
      const newTrafficSource: TrafficSource = {
        id: this.trafficSources.length > 0 
          ? Math.max(...this.trafficSources.map(s => s.id)) + 1 
          : 1,
        url: this.newSource.url,
        status: 'pending', // New sources start as pending
        date: formattedDate
      };

      // Add to list
      this.trafficSources = [...this.trafficSources, newTrafficSource];

      // Reset form and close
      this.newSource = {
        sourceType: '',
        url: ''
      };
      this.isAddSourceFormOpen = false;
    }
  }

  deleteSource(id: number): void {
    if (confirm('Are you sure you want to delete this traffic source?')) {
      this.trafficSources = this.trafficSources.filter(source => source.id !== id);
    }
  }
}



