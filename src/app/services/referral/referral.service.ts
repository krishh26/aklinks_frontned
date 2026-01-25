import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum ReferralEndPoint {
    GET_MY_REFERRALS = '/referral/my-referrals',
    GET_ALL_REFERRALS = '/referral/all',
    GET_REFER_WISE_USERS = '/referral/refer-wise-users',
}

@Injectable({
    providedIn: 'root'
})
export class ReferralService {
    
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

    /**
     * Get user's own referral data
     */
    getMyReferralData(): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + ReferralEndPoint.GET_MY_REFERRALS, { 
                headers: this.getHeader() 
            });
    }

    /**
     * Get all referral data (admin only)
     */
    getAllReferralData(page?: number, limit?: number): Observable<any> {
        let url = this.baseUrl + ReferralEndPoint.GET_ALL_REFERRALS;
        if (page && limit) {
            url += `?page=${page}&limit=${limit}`;
        }
        return this.httpClient
            .get<any>(url, { 
                headers: this.getHeader() 
            });
    }

    /**
     * Get refer-wise total users (admin only)
     */
    getReferWiseTotalUsers(): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + ReferralEndPoint.GET_REFER_WISE_USERS, { 
                headers: this.getHeader() 
            });
    }
}
