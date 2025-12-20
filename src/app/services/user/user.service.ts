import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum UserEndPoint {
    GET_ALL = '/user/all',
    UPDATE_PROFILE = '/user/update-profile',
    UPDATE_ROLE = '/user/update-role',
    DELETE_USER = '/user/delete',
    CHANGE_PASSWORD = '/user/change-password',
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
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

    getAllUsers(page: number = 1, limit: number = 10): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        
        return this.httpClient
            .get<any>(this.baseUrl + UserEndPoint.GET_ALL, { 
                headers: this.getHeader(),
                params: params
            });
    }

    deleteUser(userId: string): Observable<any> {
        return this.httpClient
            .delete<any>(this.baseUrl + '/user/' + userId, { 
                headers: this.getHeader() 
            });
    }
}



