import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

export type DashboardActivityType = 'link_created' | 'user_registered' | 'link_click' | 'referral_bonus';

export interface DashboardRecentActivityItem {
  type: DashboardActivityType;
  at: string;
  shortLink?: string;
  originalLink?: string;
  actorName?: string;
  userName?: string;
  revenue?: number;
  amount?: number;
  referredUserName?: string;
}

export interface DashboardTopLinkItem {
  shortLink: string;
  originalLink: string;
  clicks: number;
  revenue: number;
  ownerName?: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardWidgetsService {
  private baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getHeader(): HttpHeaders {
    const token = this.localStorageService.getLoggerToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (token && token !== 'null' && token !== 'undefined') {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getRecentActivity(): Observable<{
    status: string;
    data: { scope: 'all' | 'user'; items: DashboardRecentActivityItem[] };
  }> {
    return this.httpClient.get<{
      status: string;
      data: { scope: 'all' | 'user'; items: DashboardRecentActivityItem[] };
    }>(`${this.baseUrl}/user/dashboard/recent-activity`, { headers: this.getHeader() });
  }

  getTopLinks(): Observable<{
    status: string;
    data: { scope: 'all' | 'user'; items: DashboardTopLinkItem[] };
  }> {
    return this.httpClient.get<{
      status: string;
      data: { scope: 'all' | 'user'; items: DashboardTopLinkItem[] };
    }>(`${this.baseUrl}/user/dashboard/top-links`, { headers: this.getHeader() });
  }
}
