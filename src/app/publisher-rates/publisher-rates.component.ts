import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyService, Currency } from '../services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publisher-rates',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publisher-rates.component.html',
  styleUrls: ['./publisher-rates.component.css']
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

