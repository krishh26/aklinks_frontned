import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WithdrawsComponent } from "./withdraws/withdraws.component";
import { TrafficSourceComponent } from "./traffic-source/traffic-source.component";
import { ShortenLinkComponent } from "./shorten-link/shorten-link.component";
import { SupportComponent } from "./support/support.component";
import { ChangePasswordComponent } from "./settings/change-password/change-password.component";
import { ProfileComponent } from "./settings/profile/profile.component";
import { CurrencyComponent } from "./settings/currency/currency.component";
import { CpmComponent } from "./settings/cpm/cpm.component";
import { ReferEarnSettingComponent } from "./settings/refer-earn-setting/refer-earn-setting.component";
import { AdsterraApiComponent } from "./settings/adsterra-api/adsterra-api.component";
import { AllLinksComponent } from "./all-links/all-links.component";
import { HiddenLinksComponent } from "./hidden-links/hidden-links.component";
import { ReferralEarningComponent } from "./referral-earning/referral-earning.component";
import { ReferWiseTotalUsersComponent } from "./refer-wise-total-users/refer-wise-total-users.component";
import { AdsterraAnalyticsComponent } from "./adsterra-analytics/adsterra-analytics.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    DashboardComponent,
    WithdrawsComponent,
    TrafficSourceComponent,
    ShortenLinkComponent,
    SupportComponent,
    ChangePasswordComponent,
    ProfileComponent,
    CurrencyComponent,
    CpmComponent,
    ReferEarnSettingComponent,
    AdsterraApiComponent,
    AllLinksComponent,
    HiddenLinksComponent,
    ReferralEarningComponent,
    ReferWiseTotalUsersComponent,
    AdsterraAnalyticsComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'withdraws', component: WithdrawsComponent },
      { path: 'traffic-source', component: TrafficSourceComponent },
      { path: 'shorten-link', component: ShortenLinkComponent },
      { path: 'support', component: SupportComponent },
      { path: 'settings/profile', component: ProfileComponent },
      { path: 'settings/change-password', component: ChangePasswordComponent },
      { path: 'settings/currency', component: CurrencyComponent },
      { path: 'settings/cpm', component: CpmComponent },
      { path: 'settings/refer-earn-setting', component: ReferEarnSettingComponent },
      { path: 'settings/adsterra-api', component: AdsterraApiComponent },
      { path: 'adsterra-analytics', component: AdsterraAnalyticsComponent },
      { path: 'all-links', component: AllLinksComponent },
      { path: 'hidden-links', component: HiddenLinksComponent },
      { path: 'referral-earning', component: ReferralEarningComponent },
      { path: 'refer-wise-total-users', component: ReferWiseTotalUsersComponent }
    ])
  ],
  exports: [],
})
export class AdminModule {}
