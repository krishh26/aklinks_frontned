import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-rules',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Payment and Traffic Rules</h1>
          <p>Follow these guidelines to ensure successful payments</p>
        </div>

        <div class="content-section">
          <h2>Payment and Traffic Rules</h2>
          
          <div class="rules-intro">
            <p><strong>All Users Need To Follow The Guidelines For Getting Payment</strong></p>
          </div>

          <div class="rules-list">
            <div class="rule-item">
              <div class="rule-icon">📋</div>
              <div class="rule-content">
                <h3>Profile Information</h3>
                <p>Your Profile Details Must Be Filled Properly With Real Info.</p>
              </div>
            </div>

            <div class="rule-item">
              <div class="rule-icon">💳</div>
              <div class="rule-content">
                <h3>Payment Method</h3>
                <p>The Provided Payment Method Must Be Valid/Working.</p>
              </div>
            </div>

            <div class="rule-item">
              <div class="rule-icon">🔗</div>
              <div class="rule-content">
                <h3>Multiple Shorteners</h3>
                <p>Using Multiple Shorteners Only After Inshorturl Is Allowed (Sub2Unlock And Similar Too).</p>
              </div>
            </div>

            <div class="rule-item warning">
              <div class="rule-icon">⚠️</div>
              <div class="rule-content">
                <h3>Looping Prohibition</h3>
                <p>Looping Is Strictly Prohibited.</p>
                <p class="rule-note">All Looping View Will Get 5$ CPM (Means If You Get View With Looping You Will Get 5$ CPM)</p>
              </div>
            </div>

            <div class="rule-item warning">
              <div class="rule-icon">🚫</div>
              <div class="rule-content">
                <h3>Self-Referral Policy</h3>
                <p>Self-Referral Is Not Allowed (Publisher Earning > Referral Earning)</p>
              </div>
            </div>

            <div class="rule-item">
              <div class="rule-icon">⏰</div>
              <div class="rule-content">
                <h3>Activity Requirements</h3>
                <p>Inactive Users With More Than <strong>10 Days</strong> Will Not Get Their Payment. To Be Considered Active, Users Must Use InShortUrl For at Least 1 Week.</p>
              </div>
            </div>

            <div class="rule-item warning">
              <div class="rule-icon">🛡️</div>
              <div class="rule-content">
                <h3>Traffic Quality</h3>
                <p>Self Click, VPN, Fake Traffic Not Allowed.</p>
                <p>Must Have A Valid And Active Traffic Source.</p>
                <p>Verify Your Traffic Source In The Profile Section.</p>
              </div>
            </div>

            <div class="rule-item">
              <div class="rule-icon">💰</div>
              <div class="rule-content">
                <h3>Early Payment</h3>
                <p>If You Want Payment Before Date (<strong>20% Deduction Will Be Apply</strong>).</p>
              </div>
            </div>

            <div class="rule-item highlight">
              <div class="rule-icon">⭐</div>
              <div class="rule-content">
                <h3>High Volume Bonus</h3>
                <p><strong>2000 View</strong> Per Day Users Will Get Extra CPM - <strong>Contact Us</strong></p>
              </div>
            </div>
          </div>

          <div class="contact-section">
            <h3>Need Help?</h3>
            <p>If you have any questions about these rules or need assistance, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rules-intro {
      background: #e3f2fd;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
      margin-bottom: 2rem;
      text-align: center;
    }

    .rules-intro p {
      margin: 0;
      font-size: 1.1rem;
      color: #1976d2;
    }

    .rules-list {
      display: grid;
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .rule-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #667eea;
      transition: transform 0.3s ease;
    }

    .rule-item:hover {
      transform: translateY(-2px);
    }

    .rule-item.warning {
      border-left-color: #ff9800;
      background: #fff8e1;
    }

    .rule-item.highlight {
      border-left-color: #4caf50;
      background: #f1f8e9;
    }

    .rule-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
      margin-top: 0.2rem;
    }

    .rule-content h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.2rem;
    }

    .rule-content p {
      margin: 0 0 0.5rem 0;
      color: #666;
      line-height: 1.6;
    }

    .rule-content p:last-child {
      margin-bottom: 0;
    }

    .rule-note {
      font-style: italic;
      color: #ff9800;
      font-weight: 500;
    }

    .contact-section {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      margin-top: 2rem;
    }

    .contact-section h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }

    .contact-section p {
      color: #666;
      margin: 0;
    }

    @media (max-width: 768px) {
      .rule-item {
        flex-direction: column;
        text-align: center;
      }

      .rule-icon {
        margin: 0 auto 1rem auto;
      }
    }
  `]
})
export class PaymentRulesComponent {
}
