import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>AKLinks</h1>
          <p>Create your account and start earning today!</p>
        </div>

        <div class="auth-content">
          <!-- Google Sign Up Button -->
          <button class="google-signup-btn" (click)="signUpWithGoogle()">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-logo">
            Sign Up with Google
          </button>

          <!-- Divider -->
          <div class="divider">
            <span>OR</span>
          </div>

          <!-- Signup Form -->
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="signup-form">
            <h2>Create new account</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  formControlName="fullName" 
                  placeholder="Enter your full name"
                  [class.error]="signupForm.get('fullName')?.invalid && signupForm.get('fullName')?.touched"
                >
                <div class="error-message" *ngIf="signupForm.get('fullName')?.invalid && signupForm.get('fullName')?.touched">
                  Full name is required
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email" 
                  placeholder="Enter your email"
                  [class.error]="signupForm.get('email')?.invalid && signupForm.get('email')?.touched"
                >
                <div class="error-message" *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched">
                  Please enter a valid email address
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="password">Password</label>
                <div class="password-input-wrapper">
                  <input 
                    [type]="showPassword ? 'text' : 'password'" 
                    id="password" 
                    formControlName="password" 
                    placeholder="Create a password"
                    [class.error]="signupForm.get('password')?.invalid && signupForm.get('password')?.touched"
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
                <div class="error-message" *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched">
                  Password must be at least 6 characters
                </div>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="password-input-wrapper">
                  <input 
                    [type]="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmPassword" 
                    formControlName="confirmPassword" 
                    placeholder="Confirm your password"
                    [class.error]="signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched"
                  >
                  <button 
                    type="button" 
                    class="password-toggle-btn" 
                    (click)="toggleConfirmPasswordVisibility()"
                    [attr.aria-label]="showConfirmPassword ? 'Hide password' : 'Show password'"
                  >
                    <svg *ngIf="!showConfirmPassword" class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg *ngIf="showConfirmPassword" class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div class="error-message" *ngIf="signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched">
                  Passwords do not match
                </div>
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" formControlName="agreeTerms" [class.error]="signupForm.get('agreeTerms')?.invalid && signupForm.get('agreeTerms')?.touched">
                <span class="checkmark"></span>
                I agree to the <a href="#" (click)="$event.preventDefault()">Terms of Service</a> and <a href="#" (click)="$event.preventDefault()">Privacy Policy</a>
              </label>
            </div>

            <div class="error-message" *ngIf="signupForm.get('agreeTerms')?.invalid && signupForm.get('agreeTerms')?.touched">
              You must agree to the terms and conditions
            </div>

            <div class="error-message" *ngIf="errorMessage" style="margin-bottom: 0.5rem;">
              {{ errorMessage }}
            </div>

            <button type="submit" class="signup-btn" [disabled]="signupForm.invalid || isLoading">
              <span *ngIf="!isLoading">Sign Up</span>
              <span *ngIf="isLoading">Signing Up...</span>
            </button>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/auth/login">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
      overflow: hidden;
    }

    .auth-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 650px;
      overflow: hidden;
    }

    .auth-header {
      text-align: center;
      padding: 1rem 2rem 0.75rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .auth-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .auth-header p {
      opacity: 0.9;
      margin: 0;
    }

    .auth-content {
      padding: 1rem 1.5rem;
    }

    .google-signup-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      color: #333;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 1rem;
    }

    .google-signup-btn:hover {
      border-color: #4285f4;
      box-shadow: 0 2px 10px rgba(66, 133, 244, 0.2);
    }

    .google-logo {
      width: 20px;
      height: 20px;
    }

    .divider {
      text-align: center;
      margin: 1rem 0;
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

    .signup-form h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .form-group {
      margin-bottom: 0;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.35rem;
      color: #333;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.6rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
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
      right: 0.6rem;
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
      font-size: 0.8rem;
      margin-top: 0.2rem;
    }

    .form-options {
      margin-bottom: 0.75rem;
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
      line-height: 1.4;
    }

    .checkbox-container input {
      margin-right: 0.5rem;
      margin-top: 0.1rem;
    }

    .checkbox-container a {
      color: #667eea;
      text-decoration: none;
    }

    .checkbox-container a:hover {
      text-decoration: underline;
    }

    .signup-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.65rem;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .signup-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .signup-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-footer {
      text-align: center;
      margin-top: 0.75rem;
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

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .auth-card {
        max-width: 100%;
      }
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
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Prepare payload - map fullName to name for backend
      const payload = {
        name: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      // this.router.navigate(['/admin/dashboard']);
      // return;

      this.authService.registerUser(payload).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status === 'success' && response.data) {
            // Save token and user data
            if (response.data.token) {
              this.localStorageService.setLoginToken({ token: response.data.token });
            }
            if (response.data.user) {
              this.localStorageService.setLogger(response.data.user);
            }
            this.toastService.showSuccess('Registration successful!');
            // Redirect to dashboard or home page
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.errorMessage = response.message || 'Registration failed. Please try again.';
            this.toastService.showError(this.errorMessage);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg = error.error?.message || 'Registration failed. Please try again.';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
          console.error('Registration error:', error);
        }
      });
    }
  }

  signUpWithGoogle() {
    // Redirect to Google OAuth endpoint
    window.location.href = `${environment.baseUrl}/auth/google`;
  }
}
