import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from './settings/settings.service';

export type Currency = 'USD' | 'INR';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly CURRENCY_KEY = 'app-currency';
  private readonly DEFAULT_EXCHANGE_RATE = 80; // Default fallback: 1 USD = 80 INR
  private exchangeRateSubject: BehaviorSubject<number>;
  public exchangeRate$: Observable<number>;
  private currencySubject: BehaviorSubject<Currency>;
  public currency$: Observable<Currency>;

  constructor(private settingsService: SettingsService) {
    const savedCurrency = this.getSavedCurrency();
    this.currencySubject = new BehaviorSubject<Currency>(savedCurrency);
    this.currency$ = this.currencySubject.asObservable();
    
    // Initialize exchange rate with default, then fetch from backend
    this.exchangeRateSubject = new BehaviorSubject<number>(this.DEFAULT_EXCHANGE_RATE);
    this.exchangeRate$ = this.exchangeRateSubject.asObservable();
    
    // Load exchange rate from backend
    this.loadExchangeRate();
  }

  /**
   * Load exchange rate from backend
   */
  private loadExchangeRate(): void {
    this.settingsService.getCurrencyExchangeRate().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data?.exchangeRate) {
          this.exchangeRateSubject.next(response.data.exchangeRate);
        }
      },
      error: (error) => {
        console.error('Failed to load exchange rate from backend, using default:', error);
        // Keep default value if API call fails
      }
    });
  }

  /**
   * Refresh exchange rate from backend
   */
  refreshExchangeRate(): void {
    this.loadExchangeRate();
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
      const exchangeRate = this.exchangeRateSubject.value;
      return usdAmount * exchangeRate;
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
    return this.exchangeRateSubject.value;
  }

  /**
   * Get exchange rate as Observable
   */
  getExchangeRate$(): Observable<number> {
    return this.exchangeRate$;
  }
}
