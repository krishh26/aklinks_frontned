import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable, timeout, catchError, throwError } from 'rxjs';

export enum AdsterraEndPoint {
  API_KEY = '/adsterra/api-key',
  DOMAINS = '/adsterra/domains',
  DOMAIN_PLACEMENTS = '/adsterra/domain',
  PLACEMENTS = '/adsterra/placements',
  SMART_LINKS = '/adsterra/smart-links',
  STATS = '/adsterra/stats',
}

export interface AdsterraDomain {
  id: number;
  name: string;
}

export interface AdsterraPlacement {
  id: number;
  name?: string;
  domain_id?: number;
  [key: string]: any;
}

export interface AdsterraSmartLink {
  id: number;
  title: string;
  alias: string;
  url: string;
  traffic_type: string;
  status: string;
}

export interface AdsterraStatsItem {
  date?: string;
  domain?: string;
  placement?: string;
  country?: string;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  cpm?: number;
  revenue?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AdsterraService {
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
    });

    if (token && token !== 'null' && token !== 'undefined') {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getApiKeyStatus(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + AdsterraEndPoint.API_KEY, {
      headers: this.getHeader(),
    });
  }

  updateApiKey(apiKey: string): Observable<any> {
    return this.httpClient.put<any>(
      this.baseUrl + AdsterraEndPoint.API_KEY,
      { apiKey },
      { headers: this.getHeader() }
    );
  }

  getDomains(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + AdsterraEndPoint.DOMAINS, {
      headers: this.getHeader(),
    });
  }

  getDomainPlacements(domainId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}${AdsterraEndPoint.DOMAIN_PLACEMENTS}/${domainId}/placements`,
      { headers: this.getHeader() }
    );
  }

  getAllPlacements(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + AdsterraEndPoint.PLACEMENTS, {
      headers: this.getHeader(),
    });
  }

  getSmartLinks(status?: number, trafficType?: number): Observable<any> {
    let params = new HttpParams();
    if (status !== undefined && status !== null) params = params.set('status', status.toString());
    if (trafficType !== undefined && trafficType !== null)
      params = params.set('traffic_type', trafficType.toString());

    return this.httpClient.get<any>(this.baseUrl + AdsterraEndPoint.SMART_LINKS, {
      headers: this.getHeader(),
      params: params,
    });
  }

  getStatistics(params: {
    domain?: string;
    placement?: string;
    start_date?: string;
    finish_date?: string;
    group_by?: string;
    country?: string;
    placement_sub_id?: string;
  }): Observable<any> {
    let httpParams = new HttpParams();
    if (params.domain) httpParams = httpParams.set('domain', params.domain);
    if (params.placement) httpParams = httpParams.set('placement', params.placement);
    if (params.start_date) httpParams = httpParams.set('start_date', params.start_date);
    if (params.finish_date) httpParams = httpParams.set('finish_date', params.finish_date);
    if (params.group_by) httpParams = httpParams.set('group_by', params.group_by);
    if (params.country) httpParams = httpParams.set('country', params.country);
    if (params.placement_sub_id)
      httpParams = httpParams.set('placement_sub_id', params.placement_sub_id);

    console.log('[AdsterraService] getStatistics params', params);

    return this.httpClient
      .get<any>(this.baseUrl + AdsterraEndPoint.STATS, {
        headers: this.getHeader(),
        params: httpParams,
      })
      .pipe(
        // Give the backend (which already has its own 15s timeout) enough time.
        timeout(20000),
        catchError((err) => {
          console.error('[AdsterraService] getStatistics error', err);
          return throwError(() => err);
        })
      );
  }
}
