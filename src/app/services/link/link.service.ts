import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum LinkEndPoint {
    CREATE = '/link/create',
    GET_ALL = '/link/all',
    DELETE = '/link',
    GET_USER_LINKS = '/link/user',
    TOGGLE_STATUS = '/link',
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

    getUserLinks(userId: string, search?: string, status?: string): Observable<any> {
        let params = new HttpParams();
        if (search) {
            params = params.set('search', search);
        }
        if (status && status !== 'all') {
            params = params.set('status', status);
        }
        
        return this.httpClient
            .get<any>(this.baseUrl + LinkEndPoint.GET_USER_LINKS + '/' + userId, { 
                headers: this.getHeader(),
                params: params
            });
    }

    toggleLinkStatus(linkId: string): Observable<any> {
        return this.httpClient
            .put<any>(this.baseUrl + LinkEndPoint.TOGGLE_STATUS + '/' + linkId + '/toggle-status', {}, { 
                headers: this.getHeader() 
            });
    }

    adminDeleteLink(linkId: string): Observable<any> {
        return this.httpClient
            .delete<any>(this.baseUrl + LinkEndPoint.DELETE + '/' + linkId + '/admin', { 
                headers: this.getHeader() 
            });
    }
}

