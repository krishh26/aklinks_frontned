import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

export const AdminDashboardEndPoint = {
  DASHBOARD: '/admin/dashboard',
};

export interface AdminDashboardDailyRow {
  date: string;
  views: number;
  earnings: number;
  cpm: number;
  referrals: number;
}

export interface AdminDashboardData {
  totals: {
    users: number;
    links: number;
    clicks: number;
    earnings: number;
    impressions: number;
    cpm: number;
    referralBonus: number;
  };
  today: {
    clicks: number;
    views: number;
    earnings: number;
    cpm: number;
    referralBonus: number;
  };
  monthly: { earnings: number };
  dailySeries: AdminDashboardDailyRow[];
}

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
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

  getDashboard(): Observable<{ status: string; data: AdminDashboardData }> {
    return this.httpClient.get<{ status: string; data: AdminDashboardData }>(
      this.baseUrl + AdminDashboardEndPoint.DASHBOARD,
      { headers: this.getHeader() }
    );
  }
}
