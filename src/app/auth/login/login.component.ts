import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    private localStorageService: LocalStorageService,
    private toastService: ToastService
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
          console.log("responseresponseresponse", response, typeof response)
          if (response.status === 'success' && response.data) {
            // Save token and user data
            if (response.data.token) {
              this.localStorageService.setLoginToken({ token: response.data.token });
            }
            console.log("response.data.user", response.data.user)
            console.log("response.data", response.data)
            if (response.data.user) {
              this.localStorageService.setLogger(response.data.user);
              this.toastService.showSuccess('Login successful!');
              // Redirect to admin dashboard
              this.router.navigate(['/admin/dashboard']);
            } else {
              // Fallback: Redirect to dashboard if no user data
              this.toastService.showSuccess('Login successful!');
              this.router.navigate(['/admin/dashboard']);
            }
          } else {
            this.errorMessage = response.message || 'Login failed. Please try again.';
            this.toastService.showError(this.errorMessage);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg = error.error?.message || 'Login failed. Please check your credentials and try again.';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
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
