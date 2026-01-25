import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      if (!this.token) {
        this.toastService.showError('Invalid or missing reset token');
        this.router.navigate(['/auth/login']);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';

      const payload = {
        token: this.token,
        newPassword: this.resetForm.value.newPassword
      };

      this.authService.resetPassword(payload).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.status === 'success') {
            this.toastService.showSuccess(
              response.message || 'Password reset successfully'
            );
            this.router.navigate(['/auth/login']);
          } else {
            this.errorMessage = response.message || 'Reset failed';
            this.toastService.showError(this.errorMessage);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg =
            error.error?.message || 'Failed to reset password';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
        }
      });
    }
  }
}
