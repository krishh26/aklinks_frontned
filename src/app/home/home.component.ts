import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Turn Your Traffic into Profit.</h1>
        <p class="hero-subtitle">Why just share links? Shorten them and get paid with AKLinks!</p>
        
        <div class="hero-buttons">
          <a routerLink="/auth/login" class="btn btn-primary">Login</a>
          <a routerLink="/auth/signup" class="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    </section>

    <!-- Work Process Section -->
    <section class="work-process">
      <div class="container">
        <div class="section-header">
          <h6>Work Process</h6>
          <h2>How It Works?</h2>
          <p>AKLinks is a completely free tool where you can create short links and get paid.</p>
        </div>
        
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Create Account</h3>
            <p>In order to get started with AKLinks, at first all you need is AKLinks Account & you can create it by sign-up option.</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>Shorten Your Links</h3>
            <p>Shorten that links with AKLinks you want to share, you can use Link Shorten option given in Dashboard</p>
          </div>
          
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Share Links</h3>
            <p>Now your'e ready with your shorten links, just copy them and start sharing on any platform you have community e.g: YouTube, Telegram, Website etc.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Join Us Section -->
    <section class="why-join">
      <div class="container">
        <div class="section-header">
          <h2>Why join us?</h2>
          <p>All legitimate visits you bring to AKLinks will be counted up to 1 visits per IP every 24 hours. You will earn more with AKLinks thanks also to our exclusive AdBlocks stop tools.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h3>Quick Payments</h3>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔗</div>
            <h3>Easy Link Opening</h3>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💰</div>
            <h3>Highest CPM Globaly</h3>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🚀</div>
            <h3>Fastest and Free API Support</h3>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <img src="assets/images/minimum-payout.svg" alt="Minimum $1 Payout" class="feature-image">
            </div>
            <h3>Minimum $1 Payout</h3>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <img src="assets/images/refer-earn.svg" alt="Refer And Earn" class="feature-image">
            </div>
            <h3>Refer And Earn</h3>
          </div>
        </div>
        
        <div class="cta-section">
          <a routerLink="/auth/signup" class="btn btn-primary">GET STARTED</a>
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section class="solutions">
      <div class="container">
        <div class="section-header">
          <h2>We bring solutions to make life easier for our members.</h2>
          <p>AKLinks is the best solution for publishers who want to earn more money with easier shortlink pages, AKLinks doesn't contain any pop ups , captcha and fake ads. We provide flat 6$ to 8$ CPM to All Countries..</p>
        </div>
        
        <div class="solutions-grid">
          <div class="solution-card">
            <div class="solution-icon">🤖</div>
            <h3>Telegram Bot</h3>
            <p>Telegram Bot will help you to create short links directly from your AKLinks account</p>
            <a href="#" class="solution-link">Open Telegram bot</a>
          </div>
          
          <div class="solution-card">
            <div class="solution-icon">📊</div>
            <h3>Detailed Stats</h3>
            <p>Know your audience. Analyse in detail what brings you the most income and what strategies you should adapt.</p>
          </div>
          
          <div class="solution-card">
            <div class="solution-icon">🔌</div>
            <h3>API</h3>
            <p>Shorten links more quickly with easy to use API and bring your creative and advanced ideas to life.</p>
          </div>
          
          <div class="solution-card">
            <div class="solution-icon">⚙️</div>
            <h3>User Panel</h3>
            <p>Control all of the features from the administration panel with a click of a button.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <h2>Loved From Customers</h2>
          <p>Member satisfaction is our major goal. See what our Members are saying about us.</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"AKLinks is very LEGIT. I have withdrawn around 650$ till now. instant payments and payments using USDT are a big plus for me. Have been using it for 4 months"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Calvin Carlo</h4>
                <span>Web Developer</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Highly recommend....!!! Best site to earn money using shorten links. Its pay $5 - $20 per 1000 visit according to the country. Highly recommend this site, if you try to earn using shorten links."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Christa Smith</h4>
                <span>Marketing Specialist</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Amount received : 8$ AKLinks is one of the best URL Shortener can support Daily Payment So there are no worries about money and can focus on work (make money)"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Jemina CLone</h4>
                <span>Content Creator</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Since I started using AKLinks, I've been able to monetize my website traffic more effectively and efficiently. It's been a great addition to my revenue strategy."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Smith Vodka</h4>
                <span>Anime Site Owner</span>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>"Managing my links has never been easier since I started using AKLinks. It's a game-changer!."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Cristino Murfi</h4>
                <span>Blogger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile App Section -->
    <section class="mobile-app">
      <div class="container">
        <div class="mobile-content">
          <div class="mobile-text">
            <h2>Earn Money Directly from Your Smartphone</h2>
            <p>Start shortening your links and sharing them on your website. With every click, you earn money. It's that simple!</p>
            <div class="mobile-buttons">
              <a routerLink="/auth/login" class="btn btn-primary">Login</a>
              <a routerLink="/auth/signup" class="btn btn-secondary">Sign Up</a>
            </div>
            <p class="mobile-subtitle">Earn money while you browse and share your links</p>
            <a href="#" class="mobile-cta">Start Earning Today</a>
          </div>
          <div class="mobile-image">
            <div class="phone-mockup">
              <div class="phone-screen">
                <div class="app-interface">
                  <div class="app-header">AKLinks</div>
                  <div class="app-content">
                    <div class="link-input">Paste your link here...</div>
                    <div class="shorten-btn">Shorten Link</div>
                    <div class="earnings">Earnings: $0.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>AKLinks is a free service providing an easy way to earn money by sharing shortened links with your followers. With our simple platform, you can quickly monetize your content and make money online.</p>
          <div class="footer-bottom">
            <p>&copy; 2025 Copyrights by AKLinks All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }

    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin-bottom: 3rem;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .work-process {
      padding: 6rem 0;
      background: #f8f9fa;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h6 {
      color: #667eea;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .section-header h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .section-header p {
      font-size: 1.1rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .step-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
    }

    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto 1.5rem auto;
    }

    .step-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .step-card p {
      color: #666;
      line-height: 1.6;
    }

    .why-join {
      padding: 6rem 0;
      background: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1.5rem;
      margin: 3rem 0;
    }

    .feature-item {
      text-align: center;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .feature-image {
      width: 50px;
      height: 50px;
      object-fit: contain;
      margin-bottom: 0.75rem;
    }

    .feature-item h3 {
      font-size: 1rem;
      color: #333;
      margin: 0;
      font-weight: 600;
      line-height: 1.3;
    }

    .cta-section {
      text-align: center;
      margin-top: 3rem;
    }

    .solutions {
      padding: 6rem 0;
      background: #f8f9fa;
    }

    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .solution-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .solution-card:hover {
      transform: translateY(-5px);
    }

    .solution-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .solution-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .solution-card p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .solution-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .solution-link:hover {
      text-decoration: underline;
    }

    .testimonials {
      padding: 6rem 0;
      background: white;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .testimonial-card {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }

    .testimonial-content p {
      font-style: italic;
      color: #333;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
    }

    .author-info h4 {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
    }

    .author-info span {
      color: #666;
      font-size: 0.9rem;
    }

    .mobile-app {
      padding: 6rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .mobile-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .mobile-text h2 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .mobile-text p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .mobile-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .mobile-subtitle {
      font-size: 1rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }

    .mobile-cta {
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .mobile-cta:hover {
      text-decoration: underline;
    }

    .phone-mockup {
      width: 250px;
      height: 500px;
      background: #333;
      border-radius: 30px;
      padding: 20px;
      margin: 0 auto;
      position: relative;
    }

    .phone-screen {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 20px;
      overflow: hidden;
    }

    .app-interface {
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: #667eea;
      color: white;
      padding: 15px;
      text-align: center;
      font-weight: 600;
      margin: -20px -20px 20px -20px;
    }

    .app-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .link-input {
      background: #f0f0f0;
      padding: 15px;
      border-radius: 8px;
      color: #666;
      font-size: 14px;
    }

    .shorten-btn {
      background: #667eea;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .earnings {
      background: #28a745;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .footer {
      background: #333;
      color: white;
      padding: 3rem 0 1rem;
    }

    .footer-content {
      text-align: center;
    }

    .footer-content p {
      max-width: 600px;
      margin: 0 auto 2rem auto;
      line-height: 1.6;
    }

    .footer-bottom {
      border-top: 1px solid #555;
      padding-top: 1rem;
      color: #ccc;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .mobile-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .phone-mockup {
        width: 200px;
        height: 400px;
      }

      .steps-grid,
      .solutions-grid,
      .testimonials-grid {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }
  `]
})
export class HomeComponent {
}