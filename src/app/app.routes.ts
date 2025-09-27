import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublisherRatesComponent } from './publisher-rates/publisher-rates.component';
import { PaymentProofComponent } from './payment-proof/payment-proof.component';
import { BlogComponent } from './blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publisher-rates', component: PublisherRatesComponent },
  { path: 'payment-proof', component: PaymentProofComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', redirectTo: '' }
];
