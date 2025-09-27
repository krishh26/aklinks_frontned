import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Shorten Your Links, Boost Your Reach</h1>
        <p>Create short, memorable links that drive more traffic to your content. Track clicks, analyze performance, and grow your audience with our powerful URL shortener.</p>
        
        <form class="hero-form" (ngSubmit)="shortenUrl()">
          <input 
            type="url" 
            placeholder="Paste your long URL here..." 
            [(ngModel)]="longUrl" 
            name="longUrl"
            required
          >
          <button type="submit" class="btn btn-primary">Shorten URL</button>
        </form>
        
        <div *ngIf="shortUrl" class="result">
          <p>Your shortened URL:</p>
          <div class="short-url-container">
            <input type="text" [value]="shortUrl" readonly class="short-url-input">
            <button class="btn btn-secondary" (click)="copyToClipboard()">Copy</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <h3>1M+</h3>
            <p>Links Shortened</p>
          </div>
          <div class="stat-item">
            <h3>50M+</h3>
            <p>Clicks Generated</p>
          </div>
          <div class="stat-item">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div class="stat-item">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="page-header">
          <h2>Why Choose AKLinks?</h2>
          <p>Powerful features to help you manage and optimize your links</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Create and manage your short links in seconds. Our platform is optimized for speed and reliability.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Track clicks, geographic data, and referral sources with our comprehensive analytics dashboard.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Your links are protected with enterprise-grade security and 99.9% uptime guarantee.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Custom Domains</h3>
            <p>Use your own domain to create branded short links that build trust with your audience.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Monetization</h3>
            <p>Earn money from your links with our publisher program and premium features.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Mobile Optimized</h3>
            <p>Perfect experience across all devices with our responsive design and mobile app.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who trust AKLinks for their link management needs.</p>
          <div class="cta-buttons">
            <button class="btn btn-primary">Get Started Free</button>
            <button class="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">API</a>
            <a href="#">Integrations</a>
          </div>
          
          <div class="footer-section">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          
          <div class="footer-section">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Documentation</a>
            <a href="#">Status</a>
            <a href="#">Community</a>
          </div>
          
          <div class="footer-section">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">GDPR</a>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 AKLinks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .result {
      margin-top: 2rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    
    .result p {
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .short-url-container {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .short-url-input {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      background: white;
      color: #333;
      min-width: 250px;
    }
    
    .cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    
    .cta-content h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .cta-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .short-url-container {
        flex-direction: column;
      }
      
      .short-url-input {
        min-width: auto;
        width: 100%;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HomeComponent {
  longUrl = '';
  shortUrl = '';

  shortenUrl() {
    if (this.longUrl) {
      // Simulate URL shortening
      const randomId = Math.random().toString(36).substring(2, 8);
      this.shortUrl = `https://aklinks.com/${randomId}`;
    }
  }

  copyToClipboard() {
    if (this.shortUrl) {
      navigator.clipboard.writeText(this.shortUrl).then(() => {
        // You could add a toast notification here
        console.log('URL copied to clipboard');
      });
    }
  }
}

