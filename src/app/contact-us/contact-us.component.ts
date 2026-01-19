import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
          <p>We're here to help! Get in touch with our team for any questions or support</p>
        </div>

        <div class="contact-content">
          <div class="contact-grid">
            <div class="contact-form-section">
              <h2>Send us a Message</h2>
              <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                <div class="form-group">
                  <label for="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    [(ngModel)]="formData.name"
                    required
                    placeholder="Enter your name"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    [(ngModel)]="formData.email"
                    required
                    placeholder="Enter your email"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    [(ngModel)]="formData.subject"
                    required
                    placeholder="What is this regarding?"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    [(ngModel)]="formData.message"
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    class="form-control"></textarea>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary"
                  [disabled]="!contactForm.valid || isSubmitting">
                  <span *ngIf="!isSubmitting">Send Message</span>
                  <span *ngIf="isSubmitting">Sending...</span>
                </button>

                <div *ngIf="submitMessage" class="submit-message" [class.success]="isSuccess" [class.error]="!isSuccess">
                  {{ submitMessage }}
                </div>
              </form>
            </div>

            <div class="contact-info-section">
              <h2>Get in Touch</h2>
              <p class="info-description">
                Our support team is available 24/7 to assist you with any questions or concerns. 
                We typically respond within 24 hours.
              </p>

              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">📧</div>
                  <div class="method-content">
                    <h3>Email Us</h3>
                    <p>support&#64;aklinks.com</p>
                    <p>info&#64;aklinks.com</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">💬</div>
                  <div class="method-content">
                    <h3>Support Hours</h3>
                    <p>24/7 Customer Support</p>
                    <p>We're always here to help</p>
                  </div>
                </div>

                <div class="contact-method">
                  <div class="method-icon">⚡</div>
                  <div class="method-content">
                    <h3>Response Time</h3>
                    <p>Usually within 24 hours</p>
                    <p>Urgent matters: Within 6 hours</p>
                  </div>
                </div>
              </div>

              <div class="help-section">
                <h3>Need Immediate Help?</h3>
                <p>Check out our frequently asked questions or browse our blog for helpful articles.</p>
                <div class="help-links">
                  <a routerLink="/blog" class="help-link">Visit Blog</a>
                  <a routerLink="/about-us" class="help-link">About Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-top: 2rem;
    }

    .contact-form-section h2,
    .contact-info-section h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
    }

    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

    .form-control {
      width: 100%;
      padding: 0.875rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .btn {
      width: 100%;
      padding: 0.875rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .submit-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
    }

    .submit-message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .submit-message.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .info-description {
      color: #666;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .contact-method {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .method-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .method-content h3 {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .method-content p {
      color: #666;
      margin: 0.25rem 0;
      line-height: 1.6;
    }

    .help-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      border-radius: 12px;
      color: white;
    }

    .help-section h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .help-section p {
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }

    .help-links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .help-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: white;
      color: #667eea;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .help-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 968px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .contact-method {
        flex-direction: column;
        text-align: center;
      }

      .help-links {
        flex-direction: column;
      }

      .help-link {
        text-align: center;
      }
    }
  `]
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
