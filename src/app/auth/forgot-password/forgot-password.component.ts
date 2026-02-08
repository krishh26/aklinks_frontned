import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const payload = {
        email: this.forgotForm.value.email
      };

      this.authService.forgotPassword(payload).subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.status === 'success') {
            this.toastService.showSuccess(
              response.message || 'Password reset link sent to your email'
            );
            this.router.navigate(['/auth/login']);
          } else {
            this.errorMessage = response.message || 'Something went wrong';
            this.toastService.showError(this.errorMessage);
          }
        },
        error: (error) => {
          this.isLoading = false;
          const errorMsg =
            error.error?.message || 'Failed to send reset link. Please try again.';
          this.errorMessage = errorMsg;
          this.toastService.showError(errorMsg);
        }
      });
    }
  }
}
