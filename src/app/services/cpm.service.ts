import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from './settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class CpmService {
  private readonly DEFAULT_CPM_VALUE = 5;
  private cpmSubject: BehaviorSubject<number>;
  public cpm$: Observable<number>;

  constructor(private settingsService: SettingsService) {
    this.cpmSubject = new BehaviorSubject<number>(this.DEFAULT_CPM_VALUE);
    this.cpm$ = this.cpmSubject.asObservable();

    this.loadCpm();
  }

  private loadCpm(): void {
    this.settingsService.getCpmValue().subscribe({
      next: (response) => {
        if (response.status !== 'success') return;
        const parsed = Number(response.data?.cpm);
        if (!isNaN(parsed) && isFinite(parsed) && parsed > 0) {
          this.cpmSubject.next(parsed);
        }
      },
      error: (error) => {
        console.error('Failed to load CPM from backend, using default:', error);
      }
    });
  }

  refreshCpm(): void {
    this.loadCpm();
  }

  getCpm(): number {
    return this.cpmSubject.value;
  }

  getCpm$(): Observable<number> {
    return this.cpm$;
  }
}

