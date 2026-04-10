import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-system',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-system.component.html',
  styleUrls: ['./payment-system.component.css']
})
export class PaymentSystemComponent {}
