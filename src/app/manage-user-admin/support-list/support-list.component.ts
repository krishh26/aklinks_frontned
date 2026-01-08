import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../../services/theme.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SupportService } from '../../services/support/support.service';
import { ToastService } from '../../services/toast/toast.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

interface SupportTicket {
  _id: string;
  name: string;
  subject: string;
  email: string;
  message: string;
  consent: boolean;
  status?: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string | null;
}

@Component({
  selector: 'app-support-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SidebarComponent],
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit, OnDestroy {
  supportTickets: SupportTicket[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  currentTheme: Theme = 'light';
  isThemeDropdownOpen = false;
  isSidebarOpen = false; // Will be set based on screen size
  private themeSubscription?: Subscription;
  currentPage: number = 1;
  limit: number = 10;
  totalTickets: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private supportService: SupportService,
    private toastService: ToastService
  ) {
    // Initialize sidebar state based on screen size
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    this.loadSupportTickets();
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

  loadSupportTickets(): void {
    this.isLoading = true;
    
    this.supportService.getSupportList().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success' && response.data) {
          // API returns data as an array directly
          if (Array.isArray(response.data)) {
            this.supportTickets = response.data;
            this.totalTickets = response.data.length;
            this.totalPages = Math.ceil(this.totalTickets / this.limit);
          } else {
            console.error('Invalid response structure:', response);
            this.supportTickets = [];
            this.totalTickets = 0;
            this.totalPages = 0;
          }
        } else {
          console.error('Failed to load support tickets:', response.message);
          this.supportTickets = [];
          this.totalTickets = 0;
          this.totalPages = 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading support tickets:', error);
        this.supportTickets = [];
        this.totalTickets = 0;
        this.totalPages = 0;
        this.toastService.showError(error.error?.message || 'Failed to load support tickets. Please try again.');
      }
    });
  }

  get filteredTickets(): SupportTicket[] {
    let filtered = this.supportTickets;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(ticket =>
        (ticket.name && ticket.name.toLowerCase().includes(term)) ||
        (ticket.email && ticket.email.toLowerCase().includes(term)) ||
        (ticket.subject && ticket.subject.toLowerCase().includes(term)) ||
        (ticket.message && ticket.message.toLowerCase().includes(term))
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(ticket => {
        if (ticket.status) {
          return ticket.status === this.selectedStatus;
        }
        // If no status field, show all for now
        return true;
      });
    }

    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    return filtered.slice(startIndex, endIndex);
  }

  get paginatedFilteredTickets(): SupportTicket[] {
    let filtered = this.supportTickets;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(ticket =>
        (ticket.name && ticket.name.toLowerCase().includes(term)) ||
        (ticket.email && ticket.email.toLowerCase().includes(term)) ||
        (ticket.subject && ticket.subject.toLowerCase().includes(term)) ||
        (ticket.message && ticket.message.toLowerCase().includes(term))
      );
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(ticket => {
        if (ticket.status) {
          return ticket.status === this.selectedStatus;
        }
        return true;
      });
    }

    return filtered;
  }

  onSearchChange(): void {
    // Reset to first page when search changes
    this.currentPage = 1;
  }

  onStatusChange(): void {
    // Reset to first page when status filter changes
    this.currentPage = 1;
  }

  viewTicketDetails(ticket: SupportTicket): void {
    // Show ticket details in a modal popup with all data
    const formattedDate = this.formatDate(ticket.createdAt);
    const consentStatus = ticket.consent ? 'Yes' : 'No';
    const userIdDisplay = ticket.userId ? ticket.userId : 'N/A';
    const statusDisplay = ticket.status ? ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1) : 'Pending';

    Swal.fire({
      title: 'Support Ticket Details',
      html: `
        <div class="ticket-modal-content" style="text-align: left; max-width: 100%;">
          <div class="ticket-field" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
            <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Ticket ID</div>
            <div style="font-size: 0.9375rem; color: #333; word-break: break-all;">${ticket._id}</div>
          </div>

          <div class="ticket-field" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
            <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Subject</div>
            <div style="font-size: 1rem; color: #333; font-weight: 500;">${ticket.subject || 'N/A'}</div>
          </div>

          <div class="ticket-field" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
            <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Name</div>
            <div style="font-size: 0.9375rem; color: #333;">${ticket.name || 'N/A'}</div>
          </div>

          <div class="ticket-field" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
            <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Email</div>
            <div style="font-size: 0.9375rem; color: #333; word-break: break-all;">${ticket.email || 'N/A'}</div>
          </div>

          <div class="ticket-field" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
            <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Message</div>
            <div style="font-size: 0.9375rem; color: #333; white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-top: 0.5rem;">${ticket.message || 'N/A'}</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="ticket-field" style="padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
              <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Status</div>
              <div style="font-size: 0.9375rem; color: #333;">
                <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 12px; background: ${ticket.status === 'resolved' ? 'rgba(34, 197, 94, 0.15)' : ticket.status === 'closed' ? 'rgba(107, 114, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)'}; color: ${ticket.status === 'resolved' ? '#16a34a' : ticket.status === 'closed' ? '#6b7280' : '#f59e0b'}; font-weight: 500;">
                  ${statusDisplay}
                </span>
              </div>
            </div>

            <div class="ticket-field" style="padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
              <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Consent</div>
              <div style="font-size: 0.9375rem; color: #333;">${consentStatus}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="ticket-field" style="padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
              <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">User ID</div>
              <div style="font-size: 0.9375rem; color: #333; word-break: break-all;">${userIdDisplay}</div>
            </div>

            <div class="ticket-field" style="padding-bottom: 1rem; border-bottom: 1px solid #e0e0e0;">
              <div style="font-weight: 600; color: #667eea; margin-bottom: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">Created At</div>
              <div style="font-size: 0.9375rem; color: #333;">${formattedDate}</div>
            </div>
          </div>
        </div>
      `,
      width: '700px',
      padding: '2rem',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: '#667eea',
      customClass: {
        popup: 'ticket-details-modal',
        htmlContainer: 'ticket-details-html'
      }
    });
  }

  deleteTicket(ticket: SupportTicket): void {
    if (confirm(`Are you sure you want to delete support ticket "${ticket.subject}"?`)) {
      // TODO: Implement delete support ticket API call
      // For now, just remove from local array
      this.supportTickets = this.supportTickets.filter(t => t._id !== ticket._id);
      this.toastService.showSuccess('Support ticket has been deleted successfully.');
      this.loadSupportTickets();
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    // No need to reload from API, just update pagination
  }

  get totalFilteredTickets(): number {
    return this.paginatedFilteredTickets.length;
  }

  get totalFilteredPages(): number {
    return Math.ceil(this.totalFilteredTickets / this.limit);
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

  // Expose Math to template
  Math = Math;
}

