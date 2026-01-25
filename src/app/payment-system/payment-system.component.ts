import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-system',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-system.component.html',
  styleUrls: ['./payment-system.component.css']
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
