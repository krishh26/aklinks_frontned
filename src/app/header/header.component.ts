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
                  More
                  <span>▼</span>
                </button>
                <div class="dropdown-menu">
                  <a href="#" (click)="$event.preventDefault()">Payment System</a>
                  <a href="#" (click)="$event.preventDefault()">Payment Rules</a>
                </div>
              </li>
            </ul>
            
            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()">
              ☰
            </button>
          </nav>
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
  toggleMobileMenu() {
    // Mobile menu functionality can be implemented here
    console.log('Mobile menu toggled');
  }
}

