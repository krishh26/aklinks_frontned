import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublisherRatesComponent } from './publisher-rates/publisher-rates.component';
import { PaymentProofComponent } from './payment-proof/payment-proof.component';
import { PaymentSystemComponent } from './payment-system/payment-system.component';
import { PaymentRulesComponent } from './payment-rules/payment-rules.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publisher-rates', component: PublisherRatesComponent },
  { path: 'payment-proof', component: PaymentProofComponent },
  { path: 'payment-system', component: PaymentSystemComponent },
  { path: 'payment-rules', component: PaymentRulesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];
