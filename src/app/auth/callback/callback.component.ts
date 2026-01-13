import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="callback-card">
        <div class="spinner-container" *ngIf="isLoading">
          <div class="spinner"></div>
          <p>Completing authentication...</p>
        </div>
        <div class="error-container" *ngIf="errorMessage">
          <div class="error-icon">⚠️</div>
          <h2>Authentication Failed</h2>
          <p>{{ errorMessage }}</p>
          <button class="retry-btn" (click)="redirectToLogin()">Return to Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .callback-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      padding: 3rem 2rem;
      text-align: center;
    }

    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .spinner-container p {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .error-icon {
      font-size: 3rem;
    }

    .error-container h2 {
      color: #333;
      margin: 0;
      font-size: 1.5rem;
    }

    .error-container p {
      color: #666;
      margin: 0;
    }

    .retry-btn {
      margin-top: 1rem;
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .retry-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
  `]
})
export class CallbackComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  handleCallback(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const success = params['success'];
      const error = params['error'];

      if (error || success === 'false') {
        this.isLoading = false;
        const errorMsg = error === 'google_auth_failed' 
          ? 'Google authentication failed. Please try again.' 
          : 'Authentication failed. Please try again.';
        this.errorMessage = errorMsg;
        this.toastService.showError(errorMsg);
        return;
      }

      if (token && success === 'true') {
        // Save token
        this.localStorageService.setLoginToken({ token });
        
        // Fetch user profile
        this.fetchUserProfile(token);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid authentication response. Please try again.';
        this.toastService.showError(this.errorMessage);
      }
    });
  }

  fetchUserProfile(token: string): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success' && response.data?.user) {
          // Save user data
          this.localStorageService.setLogger(response.data.user);
          
          // Redirect to dashboard
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Failed to fetch user profile. Please try again.';
          this.toastService.showError(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching user profile:', error);
        this.errorMessage = 'Failed to fetch user profile. Please try logging in again.';
        this.toastService.showError(this.errorMessage);
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}


