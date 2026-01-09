import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService, Currency } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publisher-rates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Publisher Rates</h1>
          <p>Earn money with your links through our competitive publisher program</p>
        </div>

        <div class="content-section">
          <h2>Revenue Sharing Program</h2>
          <p>Join our publisher program and start earning from your shortened links. We offer competitive rates and multiple payment options.</p>
          
          <div class="rates-grid">
            <div class="rate-card">
              <h3>Basic Plan</h3>
              <div class="rate-amount">{{ formatCurrency(0.50) }}</div>
              <div class="rate-per">per 1000 clicks</div>
              <ul class="rate-features">
                <li>Up to 10,000 clicks/month</li>
                <li>Basic analytics</li>
                <li>Standard support</li>
              </ul>
            </div>
            
            <div class="rate-card featured">
              <h3>Pro Plan</h3>
              <div class="rate-amount">{{ formatCurrency(0.75) }}</div>
              <div class="rate-per">per 1000 clicks</div>
              <ul class="rate-features">
                <li>Up to 100,000 clicks/month</li>
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Custom domains</li>
              </ul>
            </div>
            
            <div class="rate-card">
              <h3>Enterprise</h3>
              <div class="rate-amount">{{ formatCurrency(1.00) }}</div>
              <div class="rate-per">per 1000 clicks</div>
              <ul class="rate-features">
                <li>Unlimited clicks</li>
                <li>Full analytics suite</li>
                <li>24/7 dedicated support</li>
                <li>White-label solution</li>
                <li>API access</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Payment Information</h2>
          <div class="payment-info">
            <div class="payment-method">
              <h4>Payment Methods</h4>
              <ul>
                <li>PayPal</li>
                <li>Bank Transfer</li>
                <li>Cryptocurrency (Bitcoin, Ethereum)</li>
                <li>Stripe</li>
              </ul>
            </div>
            
            <div class="payment-method">
              <h4>Payment Schedule</h4>
              <ul>
                <li>Weekly payments for Pro+ plans</li>
                <li>Monthly payments for Basic plan</li>
                <li>Minimum payout: {{ formatCurrency(10) }}</li>
                <li>Automatic payments</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>How to Get Started</h2>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Sign Up</h4>
                <p>Create your free account and verify your email address</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Choose Plan</h4>
                <p>Select the plan that best fits your needs and traffic volume</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Start Earning</h4>
                <p>Create your first shortened link and start earning money</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .rate-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .rate-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .rate-card.featured {
      border-color: #667eea;
      transform: scale(1.05);
    }
    
    .rate-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    .rate-amount {
      font-size: 3rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.5rem;
    }
    
    .rate-per {
      color: #666;
      margin-bottom: 2rem;
    }
    
    .rate-features {
      list-style: none;
      text-align: left;
    }
    
    .rate-features li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .rate-features li:before {
      content: "✓";
      color: #28a745;
      font-weight: bold;
      margin-right: 0.5rem;
    }
    
    .payment-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .payment-method h4 {
      color: #667eea;
      margin-bottom: 1rem;
    }
    
    .payment-method ul {
      list-style: none;
    }
    
    .payment-method li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .step-number {
      background: #667eea;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .step-content h4 {
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    .step-content p {
      color: #666;
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .rate-card.featured {
        transform: none;
      }
      
      .rates-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PublisherRatesComponent implements OnInit, OnDestroy {
  private currencySubscription?: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    // Subscribe to currency changes to trigger change detection
    this.currencySubscription = this.currencyService.currency$.subscribe(() => {
      // Component will re-render when currency changes
    });
  }

  ngOnDestroy(): void {
    if (this.currencySubscription) {
      this.currencySubscription.unsubscribe();
    }
  }

  formatCurrency(usdAmount: number): string {
    return this.currencyService.format(usdAmount);
  }
}

