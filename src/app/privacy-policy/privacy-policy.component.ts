import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2025</p>
        </div>

        <div class="policy-content">
          <section class="policy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to AKLinks. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our 
              URL shortening service.
            </p>
          </section>

          <section class="policy-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Account registration information (name, email address, password)</li>
              <li>Payment information (for payouts)</li>
              <li>Contact information when you reach out to our support team</li>
              <li>Links you shorten through our platform</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <ul>
              <li>IP addresses and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and analytics (link clicks, traffic sources)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section class="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our URL shortening service</li>
              <li>To process payments and manage your account</li>
              <li>To analyze usage patterns and improve our services</li>
              <li>To send you important updates and notifications</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section class="policy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section class="policy-section">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and store certain 
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section class="policy-section">
            <h2>6. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, payment processing, and other functions. These third parties 
              have access to your information only to perform specific tasks on our behalf and are obligated not to disclose 
              or use it for any other purpose.
            </p>
          </section>

          <section class="policy-section">
            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided in our <a routerLink="/contact-us">Contact Us</a> page.</p>
          </section>

          <section class="policy-section">
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy 
              policy, unless a longer retention period is required or permitted by law. When we no longer need your data, 
              we will securely delete or anonymize it.
            </p>
          </section>

          <section class="policy-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If you are a parent or guardian and believe your child has provided us with 
              personal information, please contact us immediately.
            </p>
          </section>

          <section class="policy-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>
          </section>

          <section class="policy-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: privacy&#64;aklinks.com</li>
              <li>Visit our <a routerLink="/contact-us">Contact Us</a> page</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .policy-content {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .policy-section {
      margin-bottom: 3rem;
    }

    .policy-section:last-child {
      margin-bottom: 0;
    }

    .policy-section h2 {
      font-size: 1.75rem;
      color: #333;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
    }

    .policy-section h3 {
      font-size: 1.25rem;
      color: #444;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    .policy-section p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .policy-section ul {
      color: #666;
      line-height: 1.8;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .policy-section li {
      margin-bottom: 0.5rem;
    }

    .policy-section a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .policy-section a:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }

    .policy-section strong {
      color: #333;
    }

    @media (max-width: 768px) {
      .policy-content {
        padding: 2rem 1.5rem;
      }

      .policy-section h2 {
        font-size: 1.5rem;
      }

      .policy-section h3 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class PrivacyPolicyComponent {
}
