import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>About Us</h1>
          <p>Learn more about AKLinks and our mission to help you monetize your content</p>
        </div>

        <div class="about-content">
          <section class="about-section">
            <h2>Who We Are</h2>
            <p>
              AKLinks is a leading URL shortening platform that empowers content creators, marketers, and website owners 
              to monetize their traffic effectively. Founded with a vision to make online monetization accessible to everyone, 
              we provide a simple, transparent, and reliable way to earn money from your links.
            </p>
          </section>

          <section class="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide a free, user-friendly platform that helps individuals and businesses maximize their 
              revenue potential through link monetization. We believe in transparency, fair payouts, and exceptional customer 
              service to ensure our users achieve their financial goals.
            </p>
          </section>

          <section class="about-section">
            <h2>What We Offer</h2>
            <div class="features-list">
              <div class="feature-item">
                <div class="feature-icon">💰</div>
                <div class="feature-text">
                  <h3>Competitive Rates</h3>
                  <p>We offer some of the highest CPM rates globally, ensuring you get the best value for your traffic.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <div class="feature-text">
                  <h3>Fast Payments</h3>
                  <p>Get paid quickly with our streamlined payment system. Minimum payout is just $1, and we process payments daily.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔒</div>
                <div class="feature-text">
                  <h3>Secure & Reliable</h3>
                  <p>Your data and earnings are protected with industry-standard security measures and reliable infrastructure.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📊</div>
                <div class="feature-text">
                  <h3>Detailed Analytics</h3>
                  <p>Track your performance with comprehensive analytics and insights to optimize your earning potential.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🤖</div>
                <div class="feature-text">
                  <h3>API & Tools</h3>
                  <p>Access our powerful API and Telegram bot to manage your links efficiently and automate your workflow.</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">👥</div>
                <div class="feature-text">
                  <h3>24/7 Support</h3>
                  <p>Our dedicated support team is always ready to help you with any questions or issues you may have.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="about-section">
            <h2>Why Choose AKLinks?</h2>
            <p>
              AKLinks stands out from the competition with our commitment to user satisfaction, transparent policies, and 
              innovative features. We don't use pop-ups, captchas, or fake ads - just a clean, user-friendly experience that 
              converts your traffic into earnings.
            </p>
            <p>
              Whether you're a blogger, YouTuber, social media influencer, or website owner, AKLinks provides the tools and 
              support you need to succeed in the digital economy.
            </p>
          </section>

          <section class="about-section cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied users who are already earning with AKLinks.</p>
            <div class="cta-buttons">
              <a routerLink="/auth/signup" class="btn btn-primary">Sign Up Now</a>
              <a routerLink="/contact-us" class="btn btn-secondary">Contact Us</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .about-section {
      margin-bottom: 3rem;
    }

    .about-section h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
    }

    .about-section p {
      color: #666;
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .feature-item:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 2.5rem;
      flex-shrink: 0;
    }

    .feature-text h3 {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .feature-text p {
      color: #666;
      line-height: 1.6;
      font-size: 1rem;
      margin: 0;
    }

    .cta-section {
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .cta-section h2 {
      color: white;
      border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    }

    .cta-section p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
    }

    @media (max-width: 768px) {
      .features-list {
        grid-template-columns: 1fr;
      }

      .feature-item {
        flex-direction: column;
        text-align: center;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class AboutUsComponent {
}
