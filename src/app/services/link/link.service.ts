import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum LinkEndPoint {
    CREATE = '/link/create',
    GET_ALL = '/link/all',
    DELETE = '/link',
}

export interface Link {
    _id: string;
    originalLink: string;
    shortLink: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    
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

    createLink(originalLink: string): Observable<any> {
        return this.httpClient
            .post<any>(this.baseUrl + LinkEndPoint.CREATE, { originalLink }, { headers: this.getHeader() });
    }

    getAllLinks(): Observable<any> {
        return this.httpClient
            .get<any>(this.baseUrl + LinkEndPoint.GET_ALL, { headers: this.getHeader() });
    }

    deleteLink(linkId: string): Observable<any> {
        return this.httpClient
            .delete<any>(this.baseUrl + LinkEndPoint.DELETE + '/' + linkId, { headers: this.getHeader() });
    }
}

