import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">AKLinks</a>
          
          <nav class="nav">
            <ul class="nav-links">
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li><a routerLink="/publisher-rates" routerLinkActive="active">Publisher Rates</a></li>
              <li><a routerLink="/payment-proof" routerLinkActive="active">Payment Proof</a></li>
              <li><a routerLink="/blog" routerLinkActive="active">Blog</a></li>
              
              <li class="dropdown">
                <button class="dropdown-toggle">
                  Important Pages
                  <span>▼</span>
                </button>
                <div class="dropdown-menu">
                  <a routerLink="/payment-system">Payment System</a>
                  <a routerLink="/payment-rules">Payment Rules</a>
                </div>
              </li>
            </ul>
            
            <div class="auth-buttons">
              <a routerLink="/auth/login" class="btn-login">
                <span class="btn-icon">🔑</span>
                Login
              </a>
              <a routerLink="/auth/signup" class="btn-signup">
                <span class="btn-icon">👤</span>
                Sign Up
              </a>
            </div>
            
            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </nav>
        </div>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" [class.active]="isMobileMenuOpen" (click)="closeMobileMenu()">
        <div class="mobile-menu" (click)="$event.stopPropagation()">
          <ul class="mobile-nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">Home</a></li>
            <li><a routerLink="/publisher-rates" routerLinkActive="active" (click)="closeMobileMenu()">Publisher Rates</a></li>
            <li><a routerLink="/payment-proof" routerLinkActive="active" (click)="closeMobileMenu()">Payment Proof</a></li>
            <li><a routerLink="/blog" routerLinkActive="active" (click)="closeMobileMenu()">Blog</a></li>
            <li class="mobile-dropdown">
              <button class="mobile-dropdown-toggle" (click)="toggleMobileDropdown()">
                Important Pages
                <span [class.rotated]="isMobileDropdownOpen">▼</span>
              </button>
              <div class="mobile-dropdown-menu" [class.active]="isMobileDropdownOpen">
                <a routerLink="/payment-system" (click)="closeMobileMenu()">Payment System</a>
                <a routerLink="/payment-rules" (click)="closeMobileMenu()">Payment Rules</a>
              </div>
            </li>
          </ul>
          
          <div class="mobile-auth-buttons">
            <a routerLink="/auth/login" class="btn-login" (click)="closeMobileMenu()">
              <span class="btn-icon">🔑</span>
              Login
            </a>
            <a routerLink="/auth/signup" class="btn-signup" (click)="closeMobileMenu()">
              <span class="btn-icon">👤</span>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .nav-links a.active {
      color: #667eea;
      font-weight: 600;
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isMobileDropdownOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isMobileDropdownOpen = false;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileDropdownOpen = false;
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }
}

