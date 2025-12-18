import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = true;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  currentTheme: Theme = 'light';
  isUserMenuOpen = false;
  isSettingsMenuOpen = false;
  isAdminRole: boolean = false;
  isUserRole: boolean = false;

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
    this.checkUserRole();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Close user menu when sidebar closes
    if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      this.isUserMenuOpen = false;
      this.isSettingsMenuOpen = false;
    }
  }

  checkUserRole(): void {
    const user = this.localStorageService.getLogger();
    if (user && user.role) {
      const userRole = user.role.toLowerCase();
      this.isAdminRole = userRole === 'admin';
      this.isUserRole = userRole === 'user' || this.isAdminRole;
    }
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleSettingsMenu(): void {
    this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
  }

  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }
}
