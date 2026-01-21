import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Privacy Policy</h1>
            <p class="hero-subtitle">Your privacy matters to us. Learn how we protect and handle your data.</p>
            <div class="last-updated">
              <span class="update-badge">Last updated: January 21, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- Introduction Section -->
        <section class="intro-section">
          <div class="section-content">
            <div class="intro-card">
              <p class="intro-lead">
                Welcome to AKLinks. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services, including our URL shortening platform.
              </p>
              <p class="intro-text">
                By using AKLinks, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        <!-- Policy Sections -->
        <div class="policy-sections">
          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">1</div>
              <div class="section-content-wrapper">
                <h2>Information We Collect</h2>
                <div class="subsection">
                  <h3>1.1 Information You Provide to Us</h3>
                  <p>We may collect the following information when you use our services:</p>
                  <ul class="styled-list">
                    <li><span class="list-icon">•</span>Name and email address during account registration</li>
                    <li><span class="list-icon">•</span>Login credentials</li>
                    <li><span class="list-icon">•</span>Payment and payout-related information</li>
                    <li><span class="list-icon">•</span>Contact information when you communicate with our support team</li>
                    <li><span class="list-icon">•</span>URLs and links you shorten or manage through our platform</li>
                  </ul>
                </div>
                <div class="subsection">
                  <h3>1.2 Information Collected Automatically</h3>
                  <p>When you visit or use AKLinks, we may automatically collect:</p>
                  <ul class="styled-list">
                    <li><span class="list-icon">•</span>IP address</li>
                    <li><span class="list-icon">•</span>Device and browser information</li>
                    <li><span class="list-icon">•</span>Operating system</li>
                    <li><span class="list-icon">•</span>Referring URLs</li>
                    <li><span class="list-icon">•</span>Usage data such as link clicks, impressions, and traffic sources</li>
                    <li><span class="list-icon">•</span>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">2</div>
              <div class="section-content-wrapper">
                <h2>How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul class="styled-list">
                  <li><span class="list-icon">✓</span>To provide, operate, and maintain our services</li>
                  <li><span class="list-icon">✓</span>To manage user accounts and process payouts</li>
                  <li><span class="list-icon">✓</span>To analyze traffic and usage patterns</li>
                  <li><span class="list-icon">✓</span>To improve platform performance and user experience</li>
                  <li><span class="list-icon">✓</span>To send important service-related updates</li>
                  <li><span class="list-icon">✓</span>To detect, prevent, and address fraud, abuse, or technical issues</li>
                  <li><span class="list-icon">✓</span>To comply with legal obligations</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">3</div>
              <div class="section-content-wrapper">
                <h2>Cookies and Tracking Technologies</h2>
                <p>AKLinks uses cookies and similar tracking technologies to:</p>
                <ul class="styled-list">
                  <li><span class="list-icon">🍪</span>Maintain user sessions</li>
                  <li><span class="list-icon">📊</span>Analyze website traffic and usage</li>
                  <li><span class="list-icon">📢</span>Serve advertisements</li>
                  <li><span class="list-icon">⚙️</span>Improve service functionality</li>
                </ul>
                <p class="info-box">
                  You can choose to disable cookies through your browser settings. However, disabling cookies may limit certain features or functionality of our website.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">4</div>
              <div class="section-content-wrapper">
                <h2>Advertising & Google AdSense</h2>
                <p>
                  We use Google AdSense, a third-party advertising service provided by Google, to display advertisements on our website.
                </p>
                <p>
                  Google uses cookies, including the DoubleClick cookie, to serve ads to users based on their visits to this website and other websites on the internet. This enables the display of personalized and interest-based advertisements.
                </p>
                <div class="subsection">
                  <h3>User Choices and Opt-Out</h3>
                  <p>Users may opt out of personalized advertising by visiting:</p>
                  <div class="link-box">
                    <strong>Google Ads Settings:</strong>
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                      https://www.google.com/settings/ads
                    </a>
                  </div>
                  <p>Users can also learn more about how Google manages data in advertising products by visiting:</p>
                  <div class="link-box">
                    <strong>Google Advertising Policies:</strong>
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                      https://policies.google.com/technologies/ads
                    </a>
                  </div>
                  <p>
                    Third-party vendors, including Google, may collect information such as IP address, browser type, and user behavior to provide relevant advertisements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">5</div>
              <div class="section-content-wrapper">
                <h2>Third-Party Services</h2>
                <p>We may use third-party services for:</p>
                <div class="services-grid">
                  <div class="service-item">
                    <div class="service-icon">📢</div>
                    <span>Advertising</span>
                  </div>
                  <div class="service-item">
                    <div class="service-icon">📈</div>
                    <span>Analytics</span>
                  </div>
                  <div class="service-item">
                    <div class="service-icon">💳</div>
                    <span>Payment Processing</span>
                  </div>
                  <div class="service-item">
                    <div class="service-icon">🔐</div>
                    <span>Security & Fraud Prevention</span>
                  </div>
                </div>
                <p>
                  These third-party service providers have access to user information only to perform tasks on our behalf and are obligated not to use or disclose it for any other purpose.
                </p>
                <p>
                  AKLinks is not responsible for the privacy practices of third-party websites or services.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">6</div>
              <div class="section-content-wrapper">
                <h2>Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p>
                  When data is no longer required, it is securely deleted or anonymized.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">7</div>
              <div class="section-content-wrapper">
                <h2>Data Security</h2>
                <p>
                  We implement reasonable technical and organizational security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">8</div>
              <div class="section-content-wrapper">
                <h2>Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <div class="rights-grid">
                  <div class="right-item">
                    <div class="right-icon">👁️</div>
                    <span>Access to your personal data</span>
                  </div>
                  <div class="right-item">
                    <div class="right-icon">✏️</div>
                    <span>Correction of inaccurate or incomplete data</span>
                  </div>
                  <div class="right-item">
                    <div class="right-icon">🗑️</div>
                    <span>Deletion of your personal data</span>
                  </div>
                  <div class="right-item">
                    <div class="right-icon">🚫</div>
                    <span>Restriction or objection to data processing</span>
                  </div>
                  <div class="right-item">
                    <div class="right-icon">📦</div>
                    <span>Data portability</span>
                  </div>
                </div>
                <p>To exercise these rights, please contact us using the information provided below.</p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">9</div>
              <div class="section-content-wrapper">
                <h2>Children's Privacy</h2>
                <div class="warning-box">
                  <p>
                    AKLinks is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe that a child has provided personal data, please contact us immediately so we can take appropriate action.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card">
              <div class="section-number">10</div>
              <div class="section-content-wrapper">
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, along with an updated "Last updated" date. We encourage users to review this policy periodically.
                </p>
              </div>
            </div>
          </section>

          <section class="policy-section">
            <div class="section-card contact-card">
              <div class="section-number">11</div>
              <div class="section-content-wrapper">
                <h2>Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div class="contact-info">
                  <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <div class="contact-details">
                      <strong>Email:</strong>
                      <a href="mailto:privacy&#64;aklinks.in">privacy&#64;aklinks.in</a>
                    </div>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">🌐</div>
                    <div class="contact-details">
                      <strong>Website:</strong>
                      <a href="https://aklinks.in/contact-us" target="_blank" rel="noopener noreferrer">https://aklinks.in/contact-us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
      margin-bottom: 2rem;
    }

    .last-updated {
      margin-top: 2rem;
    }

    .update-badge {
      display: inline-block;
      padding: 0.5rem 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 50px;
      font-size: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* Section Styles */
    .section-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem 2rem;
    }

    /* Introduction Section */
    .intro-section {
      margin-top: -3rem;
    }

    .intro-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .intro-lead {
      font-size: 1.2rem;
      color: #333;
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .intro-text {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.8;
    }

    /* Policy Sections */
    .policy-sections {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem 4rem;
    }

    .policy-section {
      margin-bottom: 2rem;
    }

    .section-card {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      display: flex;
      gap: 2rem;
      transition: all 0.3s ease;
      border-left: 4px solid #667eea;
    }

    .section-card:hover {
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
      transform: translateY(-2px);
    }

    .contact-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-left-color: white;
    }

    .contact-card h2,
    .contact-card p,
    .contact-card strong {
      color: white;
    }

    .section-number {
      font-size: 3rem;
      font-weight: 700;
      color: #667eea;
      line-height: 1;
      flex-shrink: 0;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
    }

    .contact-card .section-number {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .section-content-wrapper {
      flex: 1;
    }

    .section-content-wrapper h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
      font-weight: 700;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .contact-card .section-content-wrapper h2 {
      color: white;
      border-bottom-color: rgba(255, 255, 255, 0.3);
    }

    .section-content-wrapper h3 {
      font-size: 1.3rem;
      color: #444;
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .contact-card .section-content-wrapper h3 {
      color: white;
    }

    .section-content-wrapper p {
      color: #666;
      line-height: 1.8;
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }

    .contact-card .section-content-wrapper p {
      color: rgba(255, 255, 255, 0.95);
    }

    .subsection {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #f0f0f0;
    }

    /* Styled Lists */
    .styled-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
    }

    .styled-list li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 0.75rem 0;
      font-size: 1.05rem;
      color: #555;
      line-height: 1.7;
    }

    .contact-card .styled-list li {
      color: rgba(255, 255, 255, 0.95);
    }

    .list-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      font-weight: 700;
      font-size: 0.75rem;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }

    .contact-card .list-icon {
      background: rgba(255, 255, 255, 0.3);
      color: white;
    }

    /* Info Box */
    .info-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #667eea;
      margin-top: 1.5rem;
    }

    /* Warning Box */
    .warning-box {
      background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
      padding: 1.5rem;
      border-radius: 12px;
      border-left: 4px solid #ffc107;
      margin-top: 1rem;
    }

    .warning-box p {
      margin: 0;
      color: #856404;
      font-weight: 500;
    }

    /* Link Box */
    .link-box {
      background: white;
      padding: 1.25rem;
      border-radius: 12px;
      margin: 1rem 0;
      border: 1px solid #e0e0e0;
    }

    .link-box strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-size: 1rem;
    }

    .link-box a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      word-break: break-all;
      transition: color 0.3s ease;
    }

    .link-box a:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }

    /* Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .service-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
    }

    .service-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .service-icon {
      font-size: 2rem;
    }

    .service-item span {
      font-size: 0.95rem;
      color: #555;
      font-weight: 500;
      text-align: center;
    }

    /* Rights Grid */
    .rights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .right-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      transition: all 0.3s ease;
    }

    .right-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);
      border-color: #667eea;
    }

    .right-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .right-item span {
      font-size: 1rem;
      color: #555;
      font-weight: 500;
    }

    /* Contact Info */
    .contact-info {
      margin-top: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      margin-bottom: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .contact-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .contact-details {
      flex: 1;
    }

    .contact-details strong {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .contact-details a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s ease;
    }

    .contact-details a:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    /* Links */
    .section-content-wrapper a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .section-content-wrapper a:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }

    .contact-card .section-content-wrapper a {
      color: white;
    }

    .section-content-wrapper strong {
      color: #333;
      font-weight: 600;
    }

    /* Responsive Design */
    @media (max-width: 968px) {
      .section-card {
        flex-direction: column;
        gap: 1.5rem;
      }

      .section-number {
        width: 50px;
        height: 50px;
        font-size: 2.5rem;
      }

      .services-grid,
      .rights-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0 3rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .section-content {
        padding: 3rem 1.5rem 2rem;
      }

      .policy-sections {
        padding: 0 1.5rem 3rem;
      }

      .intro-card {
        padding: 2rem 1.5rem;
      }

      .section-card {
        padding: 2rem 1.5rem;
      }

      .section-content-wrapper h2 {
        font-size: 1.75rem;
      }

      .section-content-wrapper h3 {
        font-size: 1.2rem;
      }

      .services-grid,
      .rights-grid {
        grid-template-columns: 1fr;
      }

      .contact-item {
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .section-content-wrapper h2 {
        font-size: 1.5rem;
      }

      .intro-lead {
        font-size: 1.1rem;
      }
    }
  `]
})
export class PrivacyPolicyComponent {
}
