import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  referralCode: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    // Get referral code from URL query parameter
    this.route.queryParams.subscribe(params => {
      if (params['ref']) {
        this.referralCode = params['ref'];
      }
    });
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
      const payload: any = {
        name: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      // Add referral code if present
      if (this.referralCode) {
        payload.referralCode = this.referralCode;
      }

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
