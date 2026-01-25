import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-rules',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-rules.component.html',
  styleUrls: ['./payment-rules.component.css']
})
export class PaymentRulesComponent {
}
