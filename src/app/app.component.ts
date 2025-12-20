import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  title = 'aklinks-linkshort';
  
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // Use window.location.pathname to get the actual current URL immediately
    // This is more reliable than router.url which might not be set yet
    const token = this.localStorageService.getLoggerToken();
    const currentUrl = window.location.pathname;
    
    // Check if user is already on an admin route - if so, don't redirect
    const isAdminRoute = currentUrl.startsWith('/admin') || currentUrl.startsWith('/manage-user-admin');
    
    // Only redirect if user has token and is NOT already in admin area
    // This prevents redirect when refreshing admin pages like /admin/withdraws
    if (token && !isAdminRoute) {
      // Define public routes that should redirect to dashboard
      const publicRoutes = ['/', '/auth/login', '/auth/signup', '/publisher-rates', '/payment-proof', '/payment-system', '/payment-rules', '/blog'];
      const isPublicRoute = publicRoutes.some(route => currentUrl === route || currentUrl.startsWith(route + '/'));
      
      if (isPublicRoute) {
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }
}

