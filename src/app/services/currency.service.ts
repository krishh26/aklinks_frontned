import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Currency = 'USD' | 'INR';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly CURRENCY_KEY = 'app-currency';
  private readonly EXCHANGE_RATE = 80; // 1 USD = 80 INR
  private currencySubject: BehaviorSubject<Currency>;
  public currency$: Observable<Currency>;

  constructor() {
    const savedCurrency = this.getSavedCurrency();
    this.currencySubject = new BehaviorSubject<Currency>(savedCurrency);
    this.currency$ = this.currencySubject.asObservable();
  }

  private getSavedCurrency(): Currency {
    const saved = localStorage.getItem(this.CURRENCY_KEY);
    if (saved === 'USD' || saved === 'INR') {
      return saved;
    }
    // Default to USD
    return 'USD';
  }

  getCurrentCurrency(): Currency {
    return this.currencySubject.value;
  }

  setCurrency(currency: Currency): void {
    this.currencySubject.next(currency);
    localStorage.setItem(this.CURRENCY_KEY, currency);
  }

  toggleCurrency(): void {
    const currentCurrency = this.getCurrentCurrency();
    this.setCurrency(currentCurrency === 'USD' ? 'INR' : 'USD');
  }

  /**
   * Convert USD amount to the current currency
   * @param usdAmount Amount in USD
   * @returns Converted amount based on current currency
   */
  convert(usdAmount: number): number {
    const currentCurrency = this.getCurrentCurrency();
    if (currentCurrency === 'INR') {
      return usdAmount * this.EXCHANGE_RATE;
    }
    return usdAmount;
  }

  /**
   * Format amount with currency symbol
   * @param usdAmount Amount in USD (base currency)
   * @param decimals Number of decimal places (default: 2)
   * @returns Formatted string with currency symbol
   */
  format(usdAmount: number, decimals: number = 2): string {
    const amount = this.convert(usdAmount);
    const currentCurrency = this.getCurrentCurrency();
    
    if (currentCurrency === 'INR') {
      return `₹${amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
    return `$${amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  /**
   * Get currency symbol
   */
  getSymbol(): string {
    return this.getCurrentCurrency() === 'INR' ? '₹' : '$';
  }

  /**
   * Get exchange rate
   */
  getExchangeRate(): number {
    return this.EXCHANGE_RATE;
  }
}
