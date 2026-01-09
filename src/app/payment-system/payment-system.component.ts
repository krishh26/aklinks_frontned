import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-system',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Payment System</h1>
          <p>Learn about our withdrawal system and payment methods</p>
        </div>

        <div class="content-section">
          <h2>Withdrawal System</h2>
          
          <div class="withdrawal-info">
            <ul>
              <li>The Withdrawal Button Is Available At 1st To 5th Days Of Every Month. (<strong>Time:</strong> 12 AM To 2PM)</li>
              <li>Payment Will Be Completed Within 72 Hours Of Withdrawal (Maximum Time To Complete Withdrawal)</li>
              <li>Our Exchange Rate Is 1$ = {{ getExchangeRate() }} INR (<strong>For All Payment Method</strong>)</li>
              <li>{{ formatCurrency(5) }} Is The Minimum Withdrawal For All Withdrawal Methods.</li>
            </ul>
          </div>

          <div class="notes-section">
            <h3>Notes:</h3>
            <p>Sunday and National Holidays Of India Will Not Be Counted In (72) Withdrawal Hours. Users Are Not Allowed To Take New Withdrawal Until Their Previous Withdrawal Is Completed.</p>
          </div>

          <div class="traffic-rules">
            <h3>Traffic Rules</h3>
            <p>Please ensure you follow our traffic rules and guidelines for successful withdrawals.</p>
          </div>

          <div class="payment-methods">
            <h2>Available Withdrawal Methods</h2>
            
            <div class="method-category">
              <h3>Indian</h3>
              <ul>
                <li>UPI (Unified Payments Interface)</li>
                <li>Google Pay (GPay)</li>
                <li>Paytm</li>
                <li>PhonePe</li>
                <li>FamPay</li>
                <li>Bank Transfer</li>
              </ul>
            </div>

            <div class="method-category">
              <h3>International</h3>
              <ul>
                <li>USDT Tether</li>
                <li>Bitcoin (BTC)</li>
                <li>Binance Pay</li>
              </ul>
            </div>

            <div class="method-category">
              <h3>Digital Gift Card</h3>
              <ul>
                <li>Amazon Gift Card</li>
                <li>Google Play Gift Card</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .withdrawal-info ul {
      list-style: none;
      padding: 0;
    }

    .withdrawal-info li {
      background: #f8f9fa;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-left: 4px solid #667eea;
      border-radius: 4px;
    }

    .notes-section {
      background: #fff3cd;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
      margin: 2rem 0;
    }

    .traffic-rules {
      background: #d1ecf1;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #17a2b8;
      margin: 2rem 0;
    }

    .payment-methods {
      margin-top: 2rem;
    }

    .method-category {
      background: white;
      padding: 1.5rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .method-category h3 {
      color: #667eea;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .method-category ul {
      list-style: none;
      padding: 0;
    }

    .method-category li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }

    .method-category li:last-child {
      border-bottom: none;
    }

    .method-category li:before {
      content: "✓";
      color: #28a745;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  `]
})
export class PaymentSystemComponent implements OnInit, OnDestroy {
  private currencySubscription?: Subscription;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
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

  getExchangeRate(): number {
    return this.currencyService.getExchangeRate();
  }
}
