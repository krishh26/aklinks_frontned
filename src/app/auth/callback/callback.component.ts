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
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
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


