import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'aklinks-linkshort';
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    const token = this.localStorageService.getLoggerToken();
    if (token) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}

