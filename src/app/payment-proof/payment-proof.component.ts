import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-proof',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Payment Proof</h1>
          <p>Transparent payment records and proof of earnings from our publisher program</p>
        </div>

        <div class="content-section">
          <h2>Recent Payments</h2>
          <p>Here are some of our recent payments to publishers. All payments are processed automatically and on time.</p>
          
          <div class="payment-proof-grid">
            <div class="proof-card">
              <div class="proof-header">
                <h4>Weekly Payment #2024-001</h4>
                <span class="amount">$1,250.00</span>
              </div>
              <div class="proof-details">
                <p><strong>Date:</strong> January 15, 2024</p>
                <p><strong>Method:</strong> PayPal</p>
                <p><strong>Status:</strong> <span class="status completed">Completed</span></p>
                <p><strong>Recipients:</strong> 45 publishers</p>
              </div>
            </div>
            
            <div class="proof-card">
              <div class="proof-header">
                <h4>Weekly Payment #2024-002</h4>
                <span class="amount">$1,480.00</span>
              </div>
              <div class="proof-details">
                <p><strong>Date:</strong> January 22, 2024</p>
                <p><strong>Method:</strong> Bank Transfer</p>
                <p><strong>Status:</strong> <span class="status completed">Completed</span></p>
                <p><strong>Recipients:</strong> 52 publishers</p>
              </div>
            </div>
            
            <div class="proof-card">
              <div class="proof-header">
                <h4>Weekly Payment #2024-003</h4>
                <span class="amount">$1,320.00</span>
              </div>
              <div class="proof-details">
                <p><strong>Date:</strong> January 29, 2024</p>
                <p><strong>Method:</strong> PayPal</p>
                <p><strong>Status:</strong> <span class="status completed">Completed</span></p>
                <p><strong>Recipients:</strong> 48 publishers</p>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Payment Statistics</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-content">
                <h3>$2.5M+</h3>
                <p>Total Paid to Publishers</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <h3>1,200+</h3>
                <p>Active Publishers</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⏰</div>
              <div class="stat-content">
                <h3>99.8%</h3>
                <p>On-Time Payment Rate</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <h3>15%</h3>
                <p>Average Monthly Growth</p>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Payment Methods</h2>
          <div class="payment-methods">
            <div class="method-card">
              <div class="method-icon">💳</div>
              <h4>PayPal</h4>
              <p>Instant payments to your PayPal account</p>
              <ul>
                <li>No fees for publishers</li>
                <li>Instant processing</li>
                <li>Available worldwide</li>
              </ul>
            </div>
            
            <div class="method-card">
              <div class="method-icon">🏦</div>
              <h4>Bank Transfer</h4>
              <p>Direct deposit to your bank account</p>
              <ul>
                <li>1-3 business days</li>
                <li>No fees for amounts over $50</li>
                <li>Available in 40+ countries</li>
              </ul>
            </div>
            
            <div class="method-card">
              <div class="method-icon">₿</div>
              <h4>Cryptocurrency</h4>
              <p>Payments in Bitcoin and Ethereum</p>
              <ul>
                <li>Low transaction fees</li>
                <li>Global accessibility</li>
                <li>Privacy focused</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Testimonials</h2>
          <div class="testimonials">
            <div class="testimonial">
              <div class="testimonial-content">
                <p>"AKLinks has been a game-changer for my affiliate marketing. The payments are always on time and the rates are competitive. I've earned over $5,000 in the past 6 months!"</p>
              </div>
              <div class="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Affiliate Marketer</span>
              </div>
            </div>
            
            <div class="testimonial">
              <div class="testimonial-content">
                <p>"The transparency of payment proof really builds trust. I can see exactly when payments are made and to how many people. It's refreshing to work with such an honest company."</p>
              </div>
              <div class="testimonial-author">
                <strong>Mike Chen</strong>
                <span>Content Creator</span>
              </div>
            </div>
            
            <div class="testimonial">
              <div class="testimonial-content">
                <p>"I've tried many URL shorteners, but AKLinks is the only one that consistently pays on time. The support team is also very responsive when I have questions."</p>
              </div>
              <div class="testimonial-author">
                <strong>Emily Rodriguez</strong>
                <span>Blogger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-proof-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .proof-card {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .proof-card:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .proof-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .proof-header h4 {
      color: #333;
      margin: 0;
    }
    
    .amount {
      font-size: 1.5rem;
      font-weight: 700;
      color: #28a745;
    }
    
    .proof-details p {
      margin: 0.5rem 0;
      color: #666;
    }
    
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .status.completed {
      background: #d4edda;
      color: #155724;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .stat-card {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .stat-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.5rem;
    }
    
    .stat-content p {
      color: #666;
      margin: 0;
    }
    
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .method-card {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .method-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .method-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .method-card h4 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .method-card p {
      color: #666;
      margin-bottom: 1rem;
    }
    
    .method-card ul {
      list-style: none;
      text-align: left;
    }
    
    .method-card li {
      padding: 0.25rem 0;
      color: #666;
    }
    
    .method-card li:before {
      content: "✓";
      color: #28a745;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    
    .testimonials {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .testimonial {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .testimonial:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .testimonial-content {
      margin-bottom: 1rem;
    }
    
    .testimonial-content p {
      color: #666;
      font-style: italic;
      line-height: 1.6;
      margin: 0;
    }
    
    .testimonial-author strong {
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
    }
    
    .testimonial-author span {
      color: #667eea;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .payment-proof-grid,
      .stats-grid,
      .payment-methods,
      .testimonials {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PaymentProofComponent {
}

