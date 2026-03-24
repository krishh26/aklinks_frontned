import { Routes, CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PublisherRatesComponent } from './publisher-rates/publisher-rates.component';
import { PaymentProofComponent } from './payment-proof/payment-proof.component';
import { PaymentSystemComponent } from './payment-system/payment-system.component';
import { PaymentRulesComponent } from './payment-rules/payment-rules.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ContentPolicyComponent } from './content-policy/content-policy.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CallbackComponent } from './auth/callback/callback.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';

const isTokenValid = (): boolean => {
  const token = inject(LocalStorageService).getLoggerToken();
  return !!token && token !== 'null' && token !== 'undefined';
};

const requireAuthGuard: CanMatchFn = (): boolean | UrlTree => {
  if (isTokenValid()) {
    return true;
  }
  return inject(Router).createUrlTree(['/auth/login']);
};

const redirectLoggedInFromAuthGuard: CanActivateFn = (): boolean | UrlTree => {
  if (isTokenValid()) {
    return inject(Router).createUrlTree(['/admin/dashboard']);
  }
  return true;
};

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publisher-rates', component: PublisherRatesComponent },
  { path: 'payment-proof', component: PaymentProofComponent },
  { path: 'payment-system', component: PaymentSystemComponent },
  { path: 'payment-rules', component: PaymentRulesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/detail', component: BlogDetailComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'content-policy', component: ContentPolicyComponent },
  { path: 'auth/login', component: LoginComponent, canActivate: [redirectLoggedInFromAuthGuard] },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'auth/signup', component: SignupComponent, canActivate: [redirectLoggedInFromAuthGuard] },
  { path: 'auth/callback', component: CallbackComponent },
  { 
    path: 'admin', 
    canMatch: [requireAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: 'manage-user-admin', 
    canMatch: [requireAuthGuard],
    loadChildren: () => import('./manage-user-admin/manage-user-admin.module').then(m => m.ManageUserAdminModule) 
  },
  { path: '**', redirectTo: '' }
];
