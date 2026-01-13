import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum SettingsEndPoint {
    GET_CURRENCY_EXCHANGE_RATE = '/settings/currency-exchange-rate',
    UPDATE_CURRENCY_EXCHANGE_RATE = '/settings/currency-exchange-rate',
    GET_ALL_SETTINGS = '/settings/all',
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    
    baseUrl!: string;

    constructor(
        private httpClient: HttpClient,
        private localStorageService: LocalStorageService
    ) {
        this.baseUrl = environment.baseUrl;
    }

    getHeader(): HttpHeaders {
        const token = this.localStorageService.getLoggerToken();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        
        // Only add Authorization header if token exists and is not null/undefined
        if (token && token !== 'null' && token !== 'undefined') {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        
        return headers;
    }

    getPublicHeader(): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return headers;
    }

    /**
     * Get currency exchange rate (public endpoint)
     */
    getCurrencyExchangeRate(): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + SettingsEndPoint.GET_CURRENCY_EXCHANGE_RATE, { 
                headers: this.getPublicHeader() 
            });
    }

    /**
     * Update currency exchange rate (admin only)
     */
    updateCurrencyExchangeRate(exchangeRate: number): Observable<any> {
        return this.httpClient
            .put<any>(this.baseUrl + SettingsEndPoint.UPDATE_CURRENCY_EXCHANGE_RATE, 
                { exchangeRate }, 
                { headers: this.getHeader() }
            );
    }

    /**
     * Get all settings (admin only)
     */
    getAllSettings(): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + SettingsEndPoint.GET_ALL_SETTINGS, { 
                headers: this.getHeader() 
            });
    }
}

