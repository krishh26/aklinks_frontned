import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export enum AuthEndPoint {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
}

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return headers;
    }

    loginUser(payload: any): Observable<any> {
        return this.httpClient
          .post<any>(this.baseUrl + AuthEndPoint.LOGIN, payload, { headers: this.getPublicHeader(), withCredentials: true });
    }

    getPublicHeader(): HttpHeaders {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return headers;
    }
    
    registerUser(payload: any): Observable<any> {
        return this.httpClient
          .post<any>(this.baseUrl + AuthEndPoint.REGISTER, payload, { headers: this.getPublicHeader() });
    }
  }