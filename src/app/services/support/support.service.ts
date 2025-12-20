import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum SupportEndPoint {
    SUPPORT = '/support',
}

export interface SupportRequest {
    name: string;
    subject: string;
    email: string;
    message: string;
    consent: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SupportService {
    
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

    submitSupportRequest(payload: SupportRequest): Observable<any> {
        return this.httpClient
            .post<any>(this.baseUrl + SupportEndPoint.SUPPORT, payload, { headers: this.getHeader() });
    }
}

