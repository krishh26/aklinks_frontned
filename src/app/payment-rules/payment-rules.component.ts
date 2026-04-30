import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CpmService } from '../services/cpm.service';

@Component({
  selector: 'app-payment-rules',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-rules.component.html',
  styleUrls: ['./payment-rules.component.css']
})
export class PaymentRulesComponent implements OnInit, OnDestroy {
  cpm: number = 5;
  private cpmSubscription?: Subscription;

  constructor(private cpmService: CpmService) {}

  ngOnInit(): void {
    this.cpmSubscription = this.cpmService.getCpm$().subscribe((val) => {
      this.cpm = val;
    });
  }

  ngOnDestroy(): void {
    this.cpmSubscription?.unsubscribe();
  }
}
