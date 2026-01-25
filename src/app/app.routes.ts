import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublisherRatesComponent } from './publisher-rates/publisher-rates.component';
import { PaymentProofComponent } from './payment-proof/payment-proof.component';
import { PaymentSystemComponent } from './payment-system/payment-system.component';
import { PaymentRulesComponent } from './payment-rules/payment-rules.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publisher-rates', component: PublisherRatesComponent },
  { path: 'payment-proof', component: PaymentProofComponent },
  { path: 'payment-system', component: PaymentSystemComponent },
  { path: 'payment-rules', component: PaymentRulesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/callback', component: CallbackComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: 'manage-user-admin', 
    loadChildren: () => import('./manage-user-admin/manage-user-admin.module').then(m => m.ManageUserAdminModule) 
  },
  { path: '**', redirectTo: '' }
];
