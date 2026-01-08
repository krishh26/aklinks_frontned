import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';

interface TrafficSource {
  id: number;
  url: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

@Component({
  selector: 'app-traffic-source',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent, AdminHeaderComponent],
  templateUrl: './traffic-source.component.html',
  styleUrls: ['./traffic-source.component.scss']
})
export class TrafficSourceComponent implements OnInit, OnDestroy {
  isSidebarOpen = false; // Will be set based on screen size
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
    private localStorageService: LocalStorageService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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

  // Logout is handled by the sidebar component

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



