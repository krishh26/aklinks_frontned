import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  status: string;
  createdAt: string;
  lastClicked?: string;
}

@Component({
  selector: 'app-user-wise-links',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent],
  templateUrl: './user-wise-links.component.html',
  styleUrls: ['./user-wise-links.component.scss']
})
export class UserWiseLinksComponent implements OnInit {
  userId: string = '';
  userName: string = '';
  links: Link[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadUserLinks();
    });
  }

  loadUserLinks(): void {
    this.isLoading = true;
    // TODO: Implement API call to fetch user links
    // TODO: Fetch user name based on userId
    this.userName = 'John Doe'; // Placeholder
    
    setTimeout(() => {
      this.links = [
        {
          id: '1',
          shortUrl: 'bit.ly/abc123',
          originalUrl: 'https://example.com/very-long-url-1',
          clicks: 1234,
          status: 'active',
          createdAt: '2024-01-15',
          lastClicked: '2024-01-20'
        },
        {
          id: '2',
          shortUrl: 'bit.ly/xyz789',
          originalUrl: 'https://example.com/very-long-url-2',
          clicks: 567,
          status: 'active',
          createdAt: '2024-01-10',
          lastClicked: '2024-01-19'
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  get filteredLinks(): Link[] {
    let filtered = this.links;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(link =>
        link.shortUrl.toLowerCase().includes(term) ||
        link.originalUrl.toLowerCase().includes(term)
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(link => link.status === this.selectedStatus);
    }

    return filtered;
  }

  onSearchChange(): void {
    // Search is handled by the getter
  }

  onStatusChange(): void {
    // Filtering is handled by the getter
  }

  goBack(): void {
    this.router.navigate(['/manage-user-admin/user-list']);
  }

  editLink(linkId: string): void {
    // TODO: Implement edit link functionality
    console.log('Edit link:', linkId);
  }

  deleteLink(linkId: string): void {
    // TODO: Implement delete link functionality
    if (confirm('Are you sure you want to delete this link?')) {
      console.log('Delete link:', linkId);
    }
  }

  toggleLinkStatus(link: Link): void {
    // TODO: Implement toggle link status
    link.status = link.status === 'active' ? 'inactive' : 'active';
    console.log('Toggle status for link:', link.id);
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



