import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitMessage = '';
  isSuccess = false;

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.submitMessage = 'Thank you for your message! We will get back to you soon.';
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      // Clear message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }, 1000);
  }
}
