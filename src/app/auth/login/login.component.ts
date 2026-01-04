import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>AKLinks</h1>
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        <div class="auth-content">
          <!-- Google Sign In Button -->
          <button class="google-signin-btn" (click)="signInWithGoogle()">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-logo">
            Sign In with Google
          </button>

          <!-- Divider -->
          <div class="divider">
            <span>OR</span>
          </div>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
            <h2>Login into account</h2>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="Enter your email"
                [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              >
              <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                Please enter a valid email address
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-input-wrapper">
                <input 
                  [type]="showPassword ? 'text' : 'password'" 
                  id="password" 
                  formControlName="password" 
                  placeholder="Enter your password"
                  [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                >
                <button 
                  type="button" 
                  class="password-toggle-btn" 
                  (click)="togglePasswordVisibility()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                >
                  <svg *ngIf="!showPassword" class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg *ngIf="showPassword" class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                Password is required
              </div>
            </div>

            <div class="error-message" *ngIf="errorMessage" style="margin-bottom: 1rem;">
              {{ errorMessage }}
            </div>

            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" formControlName="rememberMe">
                <span class="checkmark"></span>
                Remember me
              </label>
              
              <a href="#" class="forgot-password" (click)="$event.preventDefault()">
                Forgot Password?
              </a>
            </div>

            <button type="submit" class="signin-btn" [disabled]="loginForm.invalid || isLoading">
              <span *ngIf="!isLoading">Sign In</span>
              <span *ngIf="isLoading">Signing In...</span>
            </button>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/auth/signup">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .auth-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      overflow: hidden;
    }

    .auth-header {
      text-align: center;
      padding: 2rem 2rem 1rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .auth-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      opacity: 0.9;
      margin: 0;
    }

    .auth-content {
      padding: 2rem;
    }

    .google-signin-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      color: #333;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 1.5rem;
    }

    .google-signin-btn:hover {
      border-color: #4285f4;
      box-shadow: 0 2px 10px rgba(66, 133, 244, 0.2);
    }

    .google-logo {
      width: 20px;
      height: 20px;
    }

    .divider {
      text-align: center;
      margin: 1.5rem 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #ddd;
    }

    .divider span {
      background: white;
      padding: 0 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    .login-form h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input.error {
      border-color: #e74c3c;
    }

    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-input-wrapper input {
      padding-right: 3rem;
    }

    .password-toggle-btn {
      position: absolute;
      right: 0.75rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
      z-index: 1;
    }

    .password-toggle-btn:hover {
      transform: scale(1.1);
    }

    .password-toggle-btn:focus {
      outline: none;
    }

    .eye-icon {
      width: 20px;
      height: 20px;
      color: #666;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s ease;
    }

    .password-toggle-btn:hover .eye-icon {
      color: #667eea;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
    }

    .checkbox-container input {
      margin-right: 0.5rem;
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .signin-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .signin-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .signin-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
    }

    .auth-footer p {
      color: #666;
      margin: 0;
    }

    .auth-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .auth-container {
        padding: 1rem;
      }

      .auth-content {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Prepare payload
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // this.router.navigate(['/admin/dashboard']);
      // return;
      this.authService.loginUser(payload).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success' && response.data) {
            // Save token and user data
            if (response.data.token) {
              this.localStorageService.setLoginToken({ token: response.data.token });
            }
            if (response.data.user) {
              this.localStorageService.setLogger(response.data.user);
              // Redirect to admin dashboard
              this.router.navigate(['/admin/dashboard']);
            } else {
              // Fallback: Redirect to dashboard if no user data
              this.router.navigate(['/admin/dashboard']);
            }
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Login failed. Please check your credentials and try again.';
          }
          console.error('Login error:', error);
        }
      });
    }
  }

  signInWithGoogle() {
    // Redirect to Google OAuth endpoint
    window.location.href = `${environment.baseUrl}/auth/google`;
  }
}
