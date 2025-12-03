import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WithdrawsComponent } from "./withdraws/withdraws.component";
import { TrafficSourceComponent } from "./traffic-source/traffic-source.component";
import { ShortenLinkComponent } from "./shorten-link/shorten-link.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    DashboardComponent,
    WithdrawsComponent,
    TrafficSourceComponent,
    ShortenLinkComponent,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'withdraws', component: WithdrawsComponent },
      { path: 'traffic-source', component: TrafficSourceComponent },
      { path: 'shorten-link', component: ShortenLinkComponent }
    ])
  ],
  exports: [],
})
export class AdminModule {}
