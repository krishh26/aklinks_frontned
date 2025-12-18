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
import { UserListComponent } from "../master-admin/user-list/user-list.component";

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
    UserListComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'withdraws', component: WithdrawsComponent },
      { path: 'traffic-source', component: TrafficSourceComponent },
      { path: 'shorten-link', component: ShortenLinkComponent },
      { path: 'support', component: SupportComponent },
      { path: 'users', component: UserListComponent },
      { path: 'settings/profile', component: ProfileComponent },
      { path: 'settings/change-password', component: ChangePasswordComponent }
    ])
  ],
  exports: [],
})
export class AdminModule {}
