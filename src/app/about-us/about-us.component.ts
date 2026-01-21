import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">About Us</h1>
            <p class="hero-subtitle">Empowering creators and businesses with transparent link management solutions</p>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">Welcome</span>
              <h2>Welcome to AKLinks</h2>
            </div>
            <div class="welcome-text">
              <p class="lead-text">
                AKLinks is a modern URL shortening and link management platform designed to help creators, marketers, and website owners manage and monetize their links in a simple and transparent way.
              </p>
              <p>
                Our goal is to provide a reliable service that allows users to shorten URLs, track performance, and earn revenue while maintaining a clean and user-friendly experience for their audience.
              </p>
            </div>
          </div>
        </section>

        <!-- Who We Are Section -->
        <section class="info-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">Our Story</span>
              <h2>Who We Are</h2>
            </div>
            <div class="info-grid">
              <div class="info-text">
                <p>
                  AKLinks was created to make link monetization accessible and straightforward for everyone. We focus on building a platform that is easy to use, secure, and compliant with industry standards.
                </p>
                <p>
                  By combining technology, analytics, and fair monetization practices, we help users understand and optimize their traffic responsibly.
                </p>
              </div>
              <div class="info-card">
                <h3>We Serve</h3>
                <ul class="styled-list">
                  <li><span class="list-icon">✓</span>Content creators</li>
                  <li><span class="list-icon">✓</span>Bloggers and website owners</li>
                  <li><span class="list-icon">✓</span>Digital marketers</li>
                  <li><span class="list-icon">✓</span>Social media users</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Mission Section -->
        <section class="mission-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">Our Purpose</span>
              <h2>Our Mission</h2>
            </div>
            <p class="mission-lead">
              Our mission is to offer a free and transparent platform that enables users to manage their links efficiently while earning revenue in a fair and ethical way.
            </p>
            <div class="values-grid">
              <div class="value-card">
                <div class="value-icon">🔍</div>
                <h3>Transparency</h3>
                <p>Transparency in payouts and reporting</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🔒</div>
                <h3>Privacy</h3>
                <p>Respect for user privacy</p>
              </div>
              <div class="value-card">
                <div class="value-icon">✅</div>
                <h3>Compliance</h3>
                <p>Compliance with advertising and content policies</p>
              </div>
              <div class="value-card">
                <div class="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>Continuous improvement of our services</p>
              </div>
            </div>
          </div>
        </section>

        <!-- What We Offer Section -->
        <section class="features-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">Features</span>
              <h2>What We Offer</h2>
              <p class="section-description">Comprehensive tools to manage and monetize your links effectively</p>
            </div>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">🔗</div>
                </div>
                <h3>URL Shortening & Link Management</h3>
                <p>Create, manage, and organize shortened links with ease using a clean and intuitive dashboard.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">📊</div>
                </div>
                <h3>Performance Analytics</h3>
                <p>Access detailed insights such as clicks, traffic sources, and performance trends to help you make informed decisions.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">💰</div>
                </div>
                <h3>Monetization Opportunities</h3>
                <p>Earn revenue from eligible traffic through advertising-based link monetization, while maintaining a positive user experience.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">⚡</div>
                </div>
                <h3>Fast & Reliable Payments</h3>
                <p>We provide a streamlined payout system with a low minimum payout threshold and timely processing.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">🔒</div>
                </div>
                <h3>Security & Privacy</h3>
                <p>We implement standard security practices to protect user data and maintain platform reliability.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">🤖</div>
                </div>
                <h3>API & Automation Tools</h3>
                <p>Developers and advanced users can integrate with our API or automation tools to manage links programmatically.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrapper">
                  <div class="feature-icon">👥</div>
                </div>
                <h3>Customer Support</h3>
                <p>Our support team is available to assist users with platform-related questions and issues.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Why Choose Section -->
        <section class="why-choose-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">Why Us</span>
              <h2>Why Choose AKLinks</h2>
            </div>
            <p class="why-lead">
              AKLinks focuses on long-term value rather than short-term tactics. We prioritize:
            </p>
            <div class="priorities-grid">
              <div class="priority-item">
                <div class="priority-icon">✨</div>
                <h4>Clean Browsing Experience</h4>
                <p>No misleading pop-ups or forced interactions</p>
              </div>
              <div class="priority-item">
                <div class="priority-icon">📋</div>
                <h4>Clear Policies</h4>
                <p>Transparent operations and clear guidelines</p>
              </div>
              <div class="priority-item">
                <div class="priority-icon">🔄</div>
                <h4>Continuous Improvement</h4>
                <p>Regular platform updates and enhancements</p>
              </div>
              <div class="priority-item">
                <div class="priority-icon">🤝</div>
                <h4>User Trust</h4>
                <p>Building lasting relationships through satisfaction</p>
              </div>
            </div>
            <p class="why-footer">
              Our platform is designed to comply with advertising and privacy standards while helping users grow sustainably.
            </p>
          </div>
        </section>

        <!-- Who Can Use Section -->
        <section class="users-section">
          <div class="section-content">
            <div class="section-header">
              <span class="section-badge">For Everyone</span>
              <h2>Who Can Use AKLinks</h2>
            </div>
            <p class="users-intro">AKLinks is suitable for:</p>
            <div class="users-grid">
              <div class="user-card">
                <div class="user-icon">✍️</div>
                <h3>Bloggers & Publishers</h3>
                <p>Content creators and website owners</p>
              </div>
              <div class="user-card">
                <div class="user-icon">🎥</div>
                <h3>Video Creators</h3>
                <p>YouTubers and video content creators</p>
              </div>
              <div class="user-card">
                <div class="user-icon">📱</div>
                <h3>Social Media Influencers</h3>
                <p>Influencers and social media marketers</p>
              </div>
              <div class="user-card">
                <div class="user-icon">💻</div>
                <h3>Developers & Owners</h3>
                <p>Website owners and developers</p>
              </div>
            </div>
            <p class="users-footer">
              Whether you are managing a personal project or a business platform, AKLinks provides tools to support your growth.
            </p>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
          <div class="cta-content">
            <h2>Get Started Today</h2>
            <p class="cta-lead">Joining AKLinks is simple. Create an account, shorten your links, track performance, and start managing your traffic efficiently.</p>
            <p class="cta-text">Sign up today and explore what AKLinks can offer.</p>
            <p class="cta-help">For questions or assistance, please visit our <a routerLink="/contact-us" class="contact-link">Contact Us</a> page.</p>
            <div class="cta-buttons">
              <a routerLink="/auth/signup" class="btn btn-primary">Sign Up Now</a>
              <a routerLink="/contact-us" class="btn btn-secondary">Contact Us</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      background: #f8f9fa;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0 4rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.95;
      line-height: 1.6;
    }

    /* Section Styles */
    .section-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-badge {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .section-description {
      font-size: 1.1rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Welcome Section */
    .welcome-section {
      background: white;
      margin-top: -3rem;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
    }

    .welcome-text {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .lead-text {
      font-size: 1.3rem;
      color: #333;
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .welcome-text p {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    /* Info Section */
    .info-section {
      background: white;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .info-text p {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .info-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 2rem;
      border-radius: 16px;
      border-left: 4px solid #667eea;
    }

    .info-card h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .styled-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .styled-list li {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
      font-size: 1.05rem;
      color: #555;
    }

    .list-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      font-weight: 700;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    /* Mission Section */
    .mission-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    }

    .mission-lead {
      font-size: 1.2rem;
      color: #333;
      line-height: 1.8;
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
      font-weight: 500;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border-top: 4px solid #667eea;
    }

    .value-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
    }

    .value-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .value-card h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .value-card p {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    /* Features Section */
    .features-section {
      background: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid #f0f0f0;
      text-align: center;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .feature-icon-wrapper {
      margin-bottom: 1.5rem;
    }

    .feature-icon {
      font-size: 3.5rem;
      display: inline-block;
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .feature-card h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .feature-card p {
      font-size: 1rem;
      color: #666;
      line-height: 1.7;
      margin: 0;
    }

    /* Why Choose Section */
    .why-choose-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .why-choose-section .section-header h2 {
      color: white;
    }

    .why-lead {
      font-size: 1.2rem;
      text-align: center;
      max-width: 700px;
      margin: 0 auto 3rem;
      opacity: 0.95;
      line-height: 1.8;
    }

    .priorities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .priority-item {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .priority-item:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-5px);
    }

    .priority-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .priority-item h4 {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .priority-item p {
      font-size: 0.95rem;
      opacity: 0.9;
      line-height: 1.6;
      margin: 0;
    }

    .why-footer {
      text-align: center;
      font-size: 1.1rem;
      opacity: 0.95;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.8;
    }

    /* Users Section */
    .users-section {
      background: white;
    }

    .users-intro {
      text-align: center;
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 3rem;
      font-weight: 500;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .user-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      padding: 2.5rem 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .user-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .user-icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .user-card h3 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .user-card p {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    .users-footer {
      text-align: center;
      font-size: 1.1rem;
      color: #666;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.8;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      margin: 4rem 0;
      padding: 4rem 2rem;
      text-align: center;
      color: white;
      box-shadow: 0 10px 50px rgba(102, 126, 234, 0.3);
    }

    .cta-content {
      max-width: 700px;
      margin: 0 auto;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .cta-lead {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      opacity: 0.95;
      line-height: 1.8;
    }

    .cta-text {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .cta-help {
      font-size: 1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .contact-link {
      color: white;
      text-decoration: underline;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .contact-link:hover {
      opacity: 0.8;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2.5rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-primary:hover {
      background: #f8f9fa;
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
    }

    .btn-secondary:hover {
      background: white;
      color: #667eea;
      transform: translateY(-3px);
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0 3rem;
      }

      .hero-title {
        font-size: 2rem;
      }

      .section-content {
        padding: 3rem 1.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .values-grid,
      .priorities-grid,
      .users-grid {
        grid-template-columns: 1fr;
      }

      .cta-section {
        padding: 3rem 1.5rem;
      }

      .cta-section h2 {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 1.75rem;
      }

      .section-header h2 {
        font-size: 1.75rem;
      }

      .lead-text {
        font-size: 1.1rem;
      }
    }
  `]
})
export class AboutUsComponent {
}
